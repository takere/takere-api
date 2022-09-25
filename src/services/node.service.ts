import Service = require('./service');
import Node = require('../domain/node.domain');
import NodeRepository = require('../repositories/node.repository');

class NodeService extends Service {
  private nodeRepository: NodeRepository; 

  constructor() {
    super();
    this.nodeRepository = this.repository.nodeRepository;
  }

  getNodes(): Node[] {
    return require('../assets/nodes');
  }

  public getAllConnections(): Object {
    const connections = require('./nodes/connections');
    
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
    return this.nodeRepository.save(node);
  }

  public async removeAllWithFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.deleteMany({ flow: flowId });
  }
}

export = NodeService;
