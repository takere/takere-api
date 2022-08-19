
import Node from "../domain/node.domain";
import NodeRepository from "../repositories/node.repository";

const repository = require('../repositories');

class NodeService {
  private nodeRepository: NodeRepository; 

  constructor() {
    this.nodeRepository = repository.nodeRepository;
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

module.exports = new NodeService();
