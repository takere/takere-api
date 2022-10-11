import Edge from "../domain/edge.domain";
import Node from "../domain/node.domain";

interface FlowDTO {
  author: any,
  name: string,
  description: string,
  patientEmail: string,
  nodes: Node[],
  edges: Edge[]
}

export = FlowDTO;
