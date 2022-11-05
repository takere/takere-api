import Service from './service';
import Node from '../domain/node.domain';
import NodeRepository from '../repositories/node.repository';
import FinishedService from './finished.service';
import NodeConnection from '../models/node-connection.model';
import connections from '../assets/nodes/connections.json';
import nodes from '../assets/nodes';
import NodeDTO from '../dto/node.dto';

class NodeService extends Service {
  private nodeRepository: NodeRepository; 
  private finishedService: FinishedService; 

  constructor() {
    super();
    this.nodeRepository = this.repository.nodeRepository;
    this.finishedService = new FinishedService();
  }

  getNodes(): NodeDTO[] {
    return nodes;
  }

  public getAllConnections(): NodeConnection[] {
    
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

export default NodeService;
