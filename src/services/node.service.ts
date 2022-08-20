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
    return require('./nodes');
  }

  async find(fields: object): Promise<Node[]> {
    return this.nodeRepository.find(fields);
  }

  async findById(id: string): Promise<Node> {
    return this.nodeRepository.findOne({ _id: id });
  }

  async findAllByFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.find({ flow: flowId });
  }

  async insert(node: Node): Promise<Node> {
    return this.nodeRepository.save(node);
  }

  async removeAllWithFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.deleteMany({ flow: flowId });
  }
}

export = NodeService;
