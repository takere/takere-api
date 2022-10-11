import Service = require('./service');
import Node = require('../domain/node.domain');
import NodeRepository = require('../repositories/node.repository');
import FinishedService = require('./finished.service');

class NodeService extends Service {
  private nodeRepository: NodeRepository; 
  private finishedService: FinishedService; 

  constructor() {
    super();
    this.nodeRepository = this.repository.nodeRepository;
    this.finishedService = new FinishedService();
  }

  getNodes(): Node[] {
    return require('../assets/nodes');
  }

  public getAllConnections(): Object {
    const connections = require('../assets/nodes/connections');
    
    return connections;
  }

  public async find(fields: object): Promise<Node[]> {
    return this.nodeRepository.find(fields);
  }

  public async findById(id: string): Promise<Node> {
    return this.nodeRepository.findOne({ _id: id });
  }

  public async findAllByFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.find({ flow: flowId });
  }

  public async insert(node: Node): Promise<Node> {
    return this.nodeRepository.insert(node);
  }

  public async removeAllWithFlowId(flowId: string): Promise<Node[]> {
    const removedNodes = await this.nodeRepository.deleteMany({ flow: flowId });

    removedNodes.forEach(node => {
      if (node.id) {
        this.finishedService.removeAllWithNodeId(node.id);
      }
    });

    return removedNodes;
  }
}

export = NodeService;
