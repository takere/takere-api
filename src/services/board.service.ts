/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from './service';
import FinishedService from './finished.service';
import NodeService from './node.service';
import EdgeService from './edge.service';
import JobService from './job.service';
import UserService from './user.service';
import Board from '../domain/board.domain';
import BoardDTO from '../dto/board.dto';
import BoardRepository from '../repositories/board.repository';
import UserBoardDTO from '../dto/user-board.dto';
import Flow from '../domain/flow.domain';
import Node from '../domain/node.domain';
import Edge from '../domain/edge.domain';


/**
 * Responsible for manage boards along with card creation.
 */
class BoardService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly boardRepository: BoardRepository; 
  private readonly finishedService: FinishedService; 
  private readonly edgeService: EdgeService;
  private readonly nodeService: NodeService;
  private readonly jobService: JobService;
  private readonly userService: UserService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.boardRepository = this.repository.boardRepository;
    this.finishedService = new FinishedService();
    this.nodeService = new NodeService();
    this.edgeService = new EdgeService();
    this.jobService = new JobService();
    this.userService = new UserService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findAllUnfinishedByEmail(email: string): Promise<UserBoardDTO[]> {
    const boards = await this.boardRepository.findAllUnfinishedByEmail(email);
    const convertedBoards = this.convertBoardsToUserBoards(boards);
    this.sortBoardsBySeverity(convertedBoards);

    return convertedBoards;
  }
  
  private convertBoardsToUserBoards(boards: Board[]): UserBoardDTO[] {
    const convertedBoards: UserBoardDTO[] = [];

    for (const board of boards) {
      convertedBoards.push(this.convertBoardToUserBoards(board));
    }

    return convertedBoards;
  }

  private convertBoardToUserBoards(board: Board): UserBoardDTO {
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

  private sortBoardsBySeverity(boards: UserBoardDTO[]) {
    boards.sort((board1, board2) => {
      if (!board1.node.arguments) {
        return -1;
      }

      if (!board2.node.arguments) {
        return 1;
      }

      return (this.extractSeverityOf(board2) - this.extractSeverityOf(board1));
    });
  }

  private extractSeverityOf(board: UserBoardDTO): number {
    if (!board.node.arguments) {
      return 0;
    }

    const severityIdx: number = this.extractIndexOfSeverityParameter(board);
    const options = board.node.parameters[severityIdx].options;
    const selection = board.node.arguments[severityIdx];

    return parseInt(options[selection].value);
  }

  private extractIndexOfSeverityParameter(board: UserBoardDTO): number {
    return board.node.parameters.findIndex(
      parameter => parameter.slug === 'severity'
    );
  }

  public async resolve(boardId: string, answers: any): Promise<Board> {
    let board = await this.findById(boardId);

    if(!board.finished) {
       await this.markBoardAsFinished(answers, board);
    }

    this.update(board);
    await this.generateCards(board);

    return board;
  }

  private async markBoardAsFinished(answers: any, board: Board) {
    const finished = await this.finishedService.insert({
      answers,
      node: board.node
    });

    board.finished = finished.id;
  }

  private async generateCards(board: Board) {
    const nodes = await this.nodeService.findAllByFlowId(board.node.flow);
    const edges = await this.edgeService.findAllByFlowId(board.node.flow);
    const children = this.findAllChildrenOf(board.node, nodes, edges);

    children.forEach(async (child: Node) => {
      await this.insertNodeOnTheBoard(child, child.flow, nodes, edges);
    });
  }

  private findAllChildrenOf(node: Node, nodes: Node[], edges: Edge[]) {
    const childrenId = edges
      .filter(edge => edge.source === node.id)
      .map(edge => edge.target);

    return nodes.filter(node => childrenId.includes(node.id ?? ''));
  }

  public async insertNodeOnTheBoard(node: Node, flow: Flow, nodes: Node[], edges: Edge[]) {
    if (node.type === 'CONDITIONAL') {
      this.parseConditionalNode(node, flow, nodes, edges);
    }
    else if (node.type === 'PERIODIC') {
      this.parsePeriodicNode(node, flow);
    }
    else {
      this.parseNonPeriodicNode(node, flow);
    }
  }

  // TODO: fetch true and false flow
  private async parseConditionalNode(node: Node, flow: Flow, nodes: Node[], edges: Edge[]) {
    const parent = this.getParent(node, nodes, edges);
    const trueFlow: Node[] = [];
    const falseFlow: Node[] = [];
    const condition = await this.evaluateCondition(node, parent, flow);

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
          return this.isNodeFinished(parent, flow);
        }

        return (parent.arguments[leftOperand] === rightOperand);
      case '!=':
        if (parent.arguments[leftOperand] === 'medication') {
          return !this.isNodeFinished(parent, flow);
        }

        return (parent.arguments[leftOperand] !== rightOperand);
      case '>=':
        return (parent.arguments[leftOperand] >= rightOperand);
      case '>':
        return (parent.arguments[leftOperand] > rightOperand);
      case '<=':
        return (parent.arguments[leftOperand] <= rightOperand);
      case '<':
        return (parent.arguments[leftOperand] < rightOperand);
      default:
        return false;
    }
  }

  private async isNodeFinished(node: Node, flow: Flow) {
    return this.isFinished(node, flow);
  }

  private async parsePeriodicNode(node: Node, flow: Flow) {
    const frequency = this.extractFrequencyArgument(node);

    switch (frequency.select) {
      case 'daily':
        this.jobService.createDailyJobForNode(node, flow);
        
        if (this.hasBeginDate(node) && this.isNowBetweenBeginAndEndDate(node)) {
          this.createBoard(node, flow);
        }

        break;
      case 'everyHours':
        this.jobService.createEveryHoursJobForNode(frequency.number, node, flow);
        break;
      case 'everyDays':
        this.jobService.createEveryDaysJobForNode(frequency.number, node, flow);
        break;
      default:
        this.createBoard(node, flow);
        break;
    }
  }

  private extractFrequencyArgument(node: Node): any {
    if (!node.arguments) {
      return { select: 'onlyOnce', number: 0 };
    }

    const frequencyIndex = this.extractIndexOfFrequencyParameter(node);

    return node.arguments[frequencyIndex];
  }

  private extractIndexOfFrequencyParameter(node: Node): number {
    return node.parameters.findIndex(parameter => parameter.slug === 'frequency')
  }

  private isNowBetweenBeginAndEndDate(node: Node): boolean {
    return  this.isBeginDateBeforeNow(node) 
            && !this.isEndDateBeforeNow(node);
  }

  private hasBeginDate(node: Node) {
    const beginDate = node.parameters.find(
      parameter => parameter.slug === 'begin_date'
    );

    return (beginDate !== undefined);
  }

  private isBeginDateBeforeNow(node: Node) {
    const beginDate = this.extractBeginDateArgument(node);

    return (new Date(beginDate).getTime() < new Date().getTime());
  }

  private extractBeginDateArgument(node: Node) {
    if (!node.arguments) {
      return null;
    }

    const indexBeginDate = this.extractIndexOfBeginDateParameter(node);
    
    return node.arguments[indexBeginDate];
  }

  private extractIndexOfBeginDateParameter(node: Node) {
    return node.parameters.findIndex(
      parameter => parameter.slug === 'begin_date'
    );
  }

  private isEndDateBeforeNow(node: Node) {
    if (!this.hasEndDate(node)) {
      return false;
    }

    const endDate = this.extractEndDateArgument(node);

    return (new Date(endDate).getTime() < new Date().getTime());
  }

  private extractEndDateArgument(node: Node) {
    if (!node.arguments) {
      return null;
    }

    const indexEndDate = this.extractIndexOfEndDateParameter(node);
    
    return node.arguments[indexEndDate];
  }

  private extractIndexOfEndDateParameter(node: Node) {
    return node.parameters.findIndex(
      parameter => parameter.slug === 'end_date'
    );
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

  private async parseNonPeriodicNode(n: Node, flow: Flow) {
    if (this.hasBeginDate(n) && this.isEndDateBeforeNow(n)) {
      return;
    }

    this.createBoard(n, flow);
  }

  public async findById(id: string): Promise<Board> {
    return this.boardRepository.findById(id);
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

  public async isFinished(node: Node, flow: Flow) {
    const referencedBoard = await this.boardRepository.findBoard(node.id ?? '', flow.id);

    return referencedBoard && (referencedBoard.finished !== undefined);
  }

  public async findAllWithTodayDeadline(email: string) {
    const board: Board[] =  await this.boardRepository.findAllUnfinishedByEmail(email);
    const boardWithDeadline = board.filter(card => this.hasEndDate(card.node));

    return boardWithDeadline.filter(card => this.hasDeadlineForToday(card.node));
  }

  private hasEndDate(node: Node) {
    const endDate = node.parameters.find(
      (parameter: any) => parameter.slug === 'end_date'
    );

    return (endDate !== undefined)
  }

  private hasDeadlineForToday(node: Node): boolean {
    if (!node.arguments) {
      return false;
    }

    const endDate = new Date(this.extractEndDateArgument(node));

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

    const endDate = new Date(this.extractEndDateArgument(node));

    return (endDate.getDate() === this.getTomorrowDate().getDate());
  }

  private getTomorrowDate() {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    return date;
  }

  public async findProgressByEmail(email: string): Promise<any> {
    const boards = await this.boardRepository.findAll(email);

    return this.groupByFlow(boards);
  }

  private groupByFlow(boards: Board[]) {
    const formattedGroups: any[] = [];
    const groups = new Map();

    boards.forEach(board => {
      const nodesJoinFinished = { ...board.node, finished: board.finished };

      if (groups.has(board.flow.id)) {
        const nodes = groups.get(board.flow.id);

        groups.set(board.flow.id, [ ...nodes, nodesJoinFinished ]);
      }
      else {
        groups.set(board.flow.id, [nodesJoinFinished]);
      }
    });

    groups.forEach((nodes, flowId) => {
      const flowData: any = boards.find(board => board.flow.id === flowId);

      formattedGroups.push({
        flow: {
          id: flowId,
          name: flowData.name,
          description: flowData.description,
          nodes: this.groupByNode(nodes)
        }
      });
    });

    return formattedGroups;
  }

  private groupByNode(nodes: any[]) {
    const groups = new Map();
    const formattedGroups: any[] = [];

    nodes.forEach(node => {
      if (groups.has(node.slug)) {
        const groupedNodes = groups.get(node.slug);

        groups.set(node.slug, [ ...groupedNodes, node ]);
      }
      else {
        groups.set(node.slug, [ node ]);
      }
    });

    groups.forEach((nodeInstances, nodeSlug) => {
      const totalCompleted = nodeInstances.filter(
        (node: any) => node.finished !== undefined
      );

      formattedGroups.push({
        node: { 
          slug: nodeSlug,
          color: nodeInstances[0].color,
          icon: nodeInstances[0].icon,
          name: nodeInstances[0].name
        },
        completed: totalCompleted.length,
        total: nodeInstances.length
      });
    });

    return formattedGroups;
  }

  public async findAllFinishedByEmail(email: string): Promise<UserBoardDTO[]> {
    const boards = await this.boardRepository.findAllFinishedByEmail(email);

    return boards;
  }

  public async findAllProgressWithFlowCreatedBy(userId: string) {
    const boards = await this.boardRepository.findAllByAuthor(userId);
    const formattedBoards: any[] = [];
    const addedFlows = new Set();

    for (let board of boards) {
      if (addedFlows.has(board.flow.id)) {
        continue;
      }

      const patient = await this.userService.findByEmail(board.flow.patientEmail);

      formattedBoards.push({
        patient: patient,
        flow: {
          id: board.flow.id,
          name: board.flow.name,
          description: board.flow.description
        }
      });

      addedFlows.add(board.flow.id);
    }

    return formattedBoards;
  }

  public async findProgressByFlowAndPatient(flowId: string, patientId: string) {
    const user = await this.userService.findById(patientId);
    const boards = await this.boardRepository.findAllByFlowAndPatient(flowId, user.email);
    const flow = (boards.length > 0) ? boards[0].flow : { id: -1, name: '', description: '' };

    return {
      patient: user,
      flow: {
        id: flow.id,
        name: flow.name,
        description: flow.description,
        completed: this.extractFinishedBoardsFrom(boards),
        ongoing: this.extractOngoingBoardsFrom(boards),
        late: this.extractLateBoardsFrom(boards)
      }
    };
  }

  private extractFinishedBoardsFrom(boards: Board[]) {
    return boards.filter(board => board.finished !== undefined);
  }

  private extractOngoingBoardsFrom(boards: Board[]) {
    const unfinishedBoards = this.extractUnfinishedBoardsFrom(boards);

    return unfinishedBoards
      .filter(board => !this.isEndDateBeforeNow(board.node))
      .map(board => ({ ...board, deadline: this.extractDeadlineFrom(board.node) }));
  }

  private extractDeadlineFrom(node: Node) {
    if (!node.arguments) {
      return null;
    }
    
    const idxEndDate = this.extractIndexOfEndDateParameter(node);
    
    return (idxEndDate === -1) ? null : new Date(node.arguments[idxEndDate]);
  }

  private extractUnfinishedBoardsFrom(boards: Board[]): Board[] {
    return boards.filter(board => board.finished === undefined);
  }

  private extractLateBoardsFrom(boards: Board[]) {
    const unfinishedBoards = this.extractUnfinishedBoardsFrom(boards);

    return unfinishedBoards
      .filter(board => this.hasEndDate(board.node))
      .filter(board => this.isEndDateBeforeNow(board.node))
      .map(board => ({ ...board, deadline: this.extractDeadlineFrom(board.node) }));
  }
}

export default BoardService;
