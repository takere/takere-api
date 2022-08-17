import Node from "../domain/node.domain";

export default interface NodeRepository {
  save(node: Node): Promise<Node>;
  find(fields: object): Promise<Node[]>;
  findOne(fields: object): Promise<Node>;
  deleteMany(fields: object): Promise<void>;
}
