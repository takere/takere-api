import Service = require('./service');
import NodeService = require('./node.service');
import EdgeService = require('./edge.service');
import JobService = require('./job.service');
import Flow = require('../domain/flow.domain');
import Node = require('../domain/node.domain');
import Edge = require('../domain/edge.domain');
import FlowDTO = require('../dto/flow.dto');
import UserFlowDTO = require('../dto/user-flow.dto');
import FlowRepository = require('../repositories/flow.repository');
import BoardService = require('./board.service');
import BoardDTO = require('../dto/board.dto');

class FlowService extends Service {
  private readonly flowRepository: FlowRepository;
  private readonly edgeService: EdgeService;
  private readonly nodeService: NodeService;
  private readonly jobService: JobService;
  private readonly boardService: BoardService;

  constructor() {
    super();
    this.flowRepository = this.repository.flowRepository;
    this.nodeService = new NodeService();
    this.edgeService = new EdgeService();
    this.jobService = new JobService();
    this.boardService = new BoardService();
  }

  public async findByUserIdAndFlowId(userId: string, flowId: string): Promise<UserFlowDTO> {
    const flow = await this.flowRepository.findOne({ author: userId, _id: flowId });
    const nodes = await this.nodeService.findAllByFlowId(flowId);
    const edges = await this.edgeService.findAllByFlowId(flowId);
    
    return {
      id: flow.id,
      name: flow.name,
      description: flow.description,
      email: flow.patientEmail,
      graph: [
        ...nodes,
        ...edges
      ]
    };
  }

  public async findAllByUserId(id: string): Promise<Flow[]> {
    return this.flowRepository.find({ author: id });
  }

  public async findById(id: string): Promise<Flow> {
    return this.flowRepository.findOne({ _id: id });
  }

  public async removeWithUserIdAndFlowId(userId: string, flowId: string): Promise<Flow> {
    const flow = await this.flowRepository.findOneAndRemove({author: userId, _id: flowId});

    await this.nodeService.removeAllWithFlowId(flowId);
    await this.edgeService.removeAllWithFlowId(flowId);
    await this.boardService.removeAllWithFlowId(flowId);

    return flow;
  }

  public async insert(flow: FlowDTO): Promise<Flow> {
    const storedFlow: Flow = await this.flowRepository.save(flow);
    const storedNodes: Node[] = await this.storeNodes(flow.nodes, flow.edges, storedFlow);
    const storedEdges: Edge[] = await this.storeEdges(flow.edges, storedFlow);

    for (let n of this.findAllChildrenOfRoot(storedNodes, storedEdges)) {
      await this.insertNodeOnTheBoard(n, storedFlow, storedNodes, storedEdges);
    }

    return storedFlow;
  }

  private async storeNodes(nodes: any, edges: any, storedFlow: any) {
    const storedNodes = [];

    for (let n of nodes) {
      let storedNode = await this.storeNode(n, storedFlow, nodes, edges);

      storedNodes.push(storedNode);
    }

    return storedNodes;
  }

  private async storeNode(n: any, flow: any, nodes: Node[], edges: Edge[]) {
    console.log('STORING NODE', n.id);
    let data = { ...n?.data, position: n?.position, flow: flow.id }

    const storedNode = await this.nodeService.insert(data);

    console.log('OK')

    edges.map((e: { target: any; source: any; }) => {
      if (e?.target === n.id) {
        e.target = storedNode.id;
      }
      if (e.source === n.id) {
        e.source = storedNode.id;
      }
    });

    return storedNode;
  }

  private async storeEdges(edges: any, storedFlow: any) {
    console.log('STORING EDGES');
    const storedEdges = [];

    for (let e of edges) {
      let storedEdge = await this.edgeService.insert({ source: e.source, target: e?.target, flow: storedFlow.id, animated: e.animated });

      storedEdges.push(storedEdge);
    }

    return storedEdges;
  }

  private findAllChildrenOfRoot(nodes: Node[], edges: Edge[]): Node[] {
    const root = nodes.find(node => node.type === 'BEGIN');
    const childrenIds = edges
      .filter(edge => edge.source === root?.id)
      .map(edge => edge.target);

    return nodes.filter(node => childrenIds.includes(node.id ?? ''));
  }

  private async insertNodeOnTheBoard(n: Node, flow: Flow, nodes: Node[], edges: Edge[]) {
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
    return await this.boardService.isFinished(n, flow);
  }

  private async parsePeriodicNode(n: Node, flow: Flow) {
    const frequencyIndex = n.parameters.findIndex(parameter => parameter.slug === 'frequency');
    const frequencyValue = n.arguments ? n.arguments[frequencyIndex] : { select: 'onlyOnce', number: 0 };

    switch (frequencyValue.select) {
      case 'daily':
        this.jobService.createDailyJobForNode(n, flow);
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

    this.boardService.insert(board);
  }
}

export = FlowService;
