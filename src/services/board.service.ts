import Service = require('./service');
import FinishedService = require('./finished.service');
import NodeService = require('./node.service');
import EdgeService = require('./edge.service');
import JobService = require('./job.service');
import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');
import BoardRepository = require('../repositories/board.repository');
import UserBoardDTO = require('../dto/user-board.dto');
import Flow = require('../domain/flow.domain');
import Node = require('../domain/node.domain');
import Edge = require('../domain/edge.domain');

class BoardService extends Service {
    
  private boardRepository: BoardRepository; 
  private finishedService: FinishedService; 
  private readonly edgeService: EdgeService;
  private readonly nodeService: NodeService;
  private readonly jobService: JobService;

  constructor() {
    super();
    this.boardRepository = this.repository.boardRepository;
    this.finishedService = new FinishedService();
    this.nodeService = new NodeService();
    this.edgeService = new EdgeService();
    this.jobService = new JobService();
  }

  public async findAllUnfinishedByEmail(email: string): Promise<UserBoardDTO[]> {
    const boards = await this.boardRepository.findAllUnfinishedByEmail(email);

    console.log(boards);
    
    const formattedBoards = [];

    for(const board of boards) {
      formattedBoards.push(this.formatBoard(board));
    }

    formattedBoards.sort((board1, board2) => {
      if (!board1.node.arguments) {
        return -1;
      }

      if (!board2.node.arguments) {
        return 1;
      }

      const board1SeverityIdx: number = board1.node.parameters.findIndex(parameter => parameter.slug === 'severity');
      const board2SeverityIdx: number = board2.node.parameters.findIndex(parameter => parameter.slug === 'severity');
      const board1Options = board1.node.parameters[board1SeverityIdx].options;
      const board2Options = board2.node.parameters[board2SeverityIdx].options;
      const board1Selection = board1.node.arguments[board1SeverityIdx];
      const board2Selection = board2.node.arguments[board2SeverityIdx];

      return parseInt(board2Options[board2Selection].value) - parseInt(board1Options[board1Selection].value);
    });

    return formattedBoards;
  }
  
  private formatBoard(board: Board): UserBoardDTO {
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      node: board.node,
      finished: {
        id: board?.finished?.id,
        at: board?.finished?.createdAt,
        result: board?.finished?.result
      },
    }
  }

  public async resolve(boardId: string, answers: any): Promise<Board> {
    // salva_finished(nodo, arguments)
    // para cada filho F do nodo:
    //   gera_board_para_nodo(F)

    let board = await this.findById(boardId);

    if(!board.finished) {
       const finished = await this.finishedService.insert({
          answers,
          node: board.node
       });
      
       board.finished = finished.id;
    }

    this.update(board);

    const nodes = await this.nodeService.findAllByFlowId(board.node.flow);
    const edges = await this.edgeService.findAllByFlowId(board.node.flow);
    const children = this.findAllChildrenOf(board.node, nodes, edges);
    children.forEach(async (child: Node) => {
        await this.insertNodeOnTheBoard(child, child.flow, nodes, edges);
    });

    return board;
  }

  private findAllChildrenOf(node: Node, nodes: Node[], edges: Edge[]) {
    const childrenId = edges
      .filter(edge => edge.source === node.id)
      .map(edge => edge.target);

    return nodes.filter(node => childrenId.includes(node.id ?? ''));
  }

  public async insertNodeOnTheBoard(n: Node, flow: Flow, nodes: Node[], edges: Edge[]) {
    if (n.type === 'CONDITIONAL') {
      this.parseConditionalNode(n, flow, nodes, edges);
    }
    else if (n.type === 'PERIODIC') {
      this.parsePeriodicNode(n, flow);
    }
    else {
      this.parseNonPeriodicNode(n, flow);
    }
  }

  private async parseConditionalNode(n: Node, flow: Flow, nodes: Node[], edges: Edge[]) {
    const parent = this.getParent(n, nodes, edges);
    const trueFlow: Node[] = [];
    const falseFlow: Node[] = [];
    const condition = await this.evaluateCondition(n, parent, flow);

    if (condition) {
      trueFlow.forEach(node => {
        this.insertNodeOnTheBoard(node, flow, nodes, edges);
      });
    }
    else {
      falseFlow.forEach(node => {
        this.insertNodeOnTheBoard(node, flow, nodes, edges);
      });
    }
  }

  private getParent(child: Node, nodes: Node[], edges: Edge[]) {
    const parentIds = edges
      .filter(edge => edge.target === child?.id)
      .map(edge => edge.source);

    return nodes.filter(node => parentIds.includes(node.id ?? ''))[0];
  }

  private async evaluateCondition(conditionalNode: Node, parent: Node, flow: Flow): Promise<boolean> {
    if (!conditionalNode.arguments || !parent.arguments) {
      return false;
    }
    
    const leftOperand = conditionalNode.arguments[0];
    const operator = conditionalNode.arguments[1];
    const rightOperand = conditionalNode.arguments[2];

    switch (operator) {
      case 'contains':
        return parent.arguments[leftOperand].contains(rightOperand);
      case '==':
        if (parent.arguments[leftOperand] === 'medication') {
          return await this.isNodeFinished(parent, flow);
        }

        return parent.arguments[leftOperand] === rightOperand;
      case '!=':
        if (parent.arguments[leftOperand] === 'medication') {
          return await !this.isNodeFinished(parent, flow);
        }

        return parent.arguments[leftOperand] !== rightOperand;
      case '>=':
        return parent.arguments[leftOperand] >= rightOperand;
      case '>':
        return parent.arguments[leftOperand] > rightOperand;
      case '<=':
        return parent.arguments[leftOperand] <= rightOperand;
      case '<':
        return parent.arguments[leftOperand] < rightOperand;
      default:
        return false;
    }
  }

  private async isNodeFinished(n: Node, flow: Flow) {
    return await this.isFinished(n, flow);
  }

  private async parsePeriodicNode(n: Node, flow: Flow) {
    const frequencyIndex = n.parameters.findIndex(parameter => parameter.slug === 'frequency');
    const frequencyValue = n.arguments ? n.arguments[frequencyIndex] : { select: 'onlyOnce', number: 0 };

    switch (frequencyValue.select) {
      case 'daily':
        this.jobService.createDailyJobForNode(n, flow);
        if (this.hasBeginDate(n) && this.isBeginDateBeforeNow(n) && !this.isEndDateBeforeNow(n)) {
          this.createBoard(n, flow);
        }
        break;
      case 'everyHours':
        this.jobService.createEveryHoursJobForNode(frequencyValue.number, n, flow);
        break;
      case 'everyDays':
        this.jobService.createEveryDaysJobForNode(frequencyValue.number, n, flow);
        break;
      default:
        this.createBoard(n, flow);
        break;
    }
  }

  private async parseNonPeriodicNode(n: Node, flow: Flow) {
    if (this.hasBeginDate(n) && this.isEndDateBeforeNow(n)) {
      return;
    }

    this.createBoard(n, flow);
  }

  private hasBeginDate(node: Node) {
    return (node.parameters.find(parameter => parameter.slug === 'begin_date') !== undefined);
  }

  private isBeginDateBeforeNow(node: Node) {
    const indexBeginDate = node.parameters.findIndex(parameter => parameter.slug === 'begin_date');
    const beginDate = node.arguments ? node.arguments[indexBeginDate] : null;

    return new Date(beginDate).getTime() < new Date().getTime();
  }

  private isEndDateBeforeNow(node: Node) {
    const indexEndDate = node.parameters.findIndex(parameter => parameter.slug === 'end_date');
    const endDate = node.arguments ? node.arguments[indexEndDate] : null;

    return new Date(endDate).getTime() < new Date().getTime();
  }

  private async createBoard(n: Node, flow: Flow) {
    const board : BoardDTO = {
      name: flow.name,
      description: flow.description !== undefined ? flow.description : 'N/A',
      patientEmail: flow.patientEmail,
      flow: flow.id,
      node: n.id,
      finished: undefined
    };

    this.insert(board);
  }

  public async findById(id: string): Promise<Board> {
    return this.boardRepository.findOne({ _id: id });
  }

  public async insert(board: BoardDTO): Promise<Board> {
    return this.boardRepository.save(board);
  }

  public async update(board: Board): Promise<Board> {
    return this.boardRepository.update(board);
  }

  public async removeAllWithFlowId(id: string): Promise<Board[]> {
    return this.boardRepository.removeAllWithFlowId(id);
  }

  public async isFinished(n: Node, flow: Flow) {
    const referencedBoard = await this.boardRepository.findBoard(n.id ?? '', flow.id);

    return referencedBoard && (referencedBoard.finished !== undefined);
  }

  public async findAllWithTodayDeadline(email: string) {
    const board: Board[] =  await this.boardRepository.findAllUnfinishedByEmail(email);
    const boardWithDeadline = board.filter(card => this.hasEndDate(card.node));

    return boardWithDeadline.filter(card => this.hasDeadlineForToday(card.node));
  }

  private hasEndDate(node: Node) {
    return (node.parameters.find((parameter: any) => parameter.slug === 'end_date') !== undefined)
  }

  private hasDeadlineForToday(node: Node): boolean {
    if (!node.arguments) {
      return false;
    }

    const idxEndDate = node.parameters.findIndex(parameter => parameter.slug === 'end_date');
    const endDate = new Date(node.arguments[idxEndDate]);

    return (endDate.getDate() === new Date().getDate());
  }

  public async findAllWithTomorrowDeadline(email: string) {
    const board: Board[] =  await this.boardRepository.findAllUnfinishedByEmail(email);
    const boardWithDeadline = board.filter(card => this.hasEndDate(card.node));

    return boardWithDeadline.filter(card => this.hasDeadlineForTomorrow(card.node));
  }

  private hasDeadlineForTomorrow(node: Node): boolean {
    if (!node.arguments) {
      return false;
    }

    const idxEndDate = node.parameters.findIndex(parameter => parameter.slug === 'end_date');
    const endDate = new Date(node.arguments[idxEndDate]);

    return (endDate.getDate() === this.getTomorrowDate().getDate());
  }

  private getTomorrowDate() {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    return date;
  }

  public async findProgressByEmail(email: string): Promise<any> {
    const boards = await this.findAllFinishedByEmail(email);

    console.log(boards);

    return boards;
  }

  public async findAllFinishedByEmail(email: string): Promise<UserBoardDTO[]> {
    const boards = await this.boardRepository.findAllFinishedByEmail(email);
    
    const formattedBoards = [];

    for(const board of boards) {
      formattedBoards.push(this.formatBoard(board));
    }

    formattedBoards.sort((board1, board2) => {
      if (!board1.node.arguments) {
        return -1;
      }

      if (!board2.node.arguments) {
        return 1;
      }

      const board1SeverityIdx: number = board1.node.parameters.findIndex(parameter => parameter.slug === 'severity');
      const board2SeverityIdx: number = board2.node.parameters.findIndex(parameter => parameter.slug === 'severity');
      const board1Options = board1.node.parameters[board1SeverityIdx].options;
      const board2Options = board2.node.parameters[board2SeverityIdx].options;
      const board1Selection = board1.node.arguments[board1SeverityIdx];
      const board2Selection = board2.node.arguments[board2SeverityIdx];

      return parseInt(board2Options[board2Selection].value) - parseInt(board1Options[board1Selection].value);
    });

    return formattedBoards;
  }
}

export = BoardService;
