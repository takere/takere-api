import Node from '../domain/node.domain';

interface NodeRepository {
  insert(node: Node): Promise<Node>;
  findAllByFlowId(id: string): Promise<Node[]>;
  findById(id: string): Promise<Node>;
  removeAllWithFlowID(flowId: string): Promise<Node[]>;
}

export default NodeRepository;
