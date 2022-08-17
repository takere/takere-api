import Node from "../domain/node.domain";

export default interface NodeRepository {
  save(node: Node): Node;
}
