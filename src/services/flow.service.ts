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

    await this.nodeService.removeAllWithFlowId(flow.id);
    await this.edgeService.removeAllWithFlowId(flow.id);

    return flow;
  }

  public async insert(flow: FlowDTO): Promise<Flow> {
    const storedFlow = await this.flowRepository.save(flow);
    const storedNodes: Node[] = await this.storeNodes(flow.nodes, flow.edges, storedFlow);
    const storedEdges: Edge[] = await this.storeEdges(flow.edges, storedFlow);

    for (let n of storedNodes) {
      if (!['begin', 'conditional'].includes(n.slug)) {
        // if (n.data.results.frequency) {
        //   this.jobService.createJobForNode(n, storedNodes, storedEdges);
        // }
        // else {

          let board : BoardDTO = {
            name: storedFlow.name,
            description: storedFlow.description !== undefined ? storedFlow.description : 'N/A',
            patientEmail: storedFlow.patientEmail,
            flow: storedFlow.id,
            node: n.id,
            finished: undefined
          };
          this.boardService.insert(board);
        // }
      }
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
    
    //console.log('@', { ...n?.data, position: n?.position, flow: flow.id, id: n.id })

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
}

export = FlowService;
