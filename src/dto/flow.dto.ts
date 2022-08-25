import Edge from "../domain/edge.domain";
import Node from "../domain/node.domain";

interface FlowDTO {
  user: any,
  name: string,
  description: string,
  userEmail: string,
  nodes: Node[],
  edges: Edge[]
}

export = FlowDTO;
