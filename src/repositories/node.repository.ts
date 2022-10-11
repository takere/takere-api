import Node = require('../domain/node.domain');

interface NodeRepository {
  insert(node: Node): Promise<Node>;
  find(fields: object): Promise<Node[]>;
  findOne(fields: object): Promise<Node>;
  deleteMany(fields: object): Promise<Node[]>;
}

export = NodeRepository;
