import NodeRepository = require('../../node.repository');
import Node = require('../../../domain/node.domain');

class NodeCollection implements NodeRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/node.schema');
  }

  public async findOne(fields: object): Promise<Node> {
    const storedNode = await this._schema.findOne(fields);

    return { ...storedNode._doc, id: storedNode._doc._id };
  }

  public async find(fields: object): Promise<Node[]> {
    return this._schema.find(fields);
  }

  public async deleteMany(fields: object): Promise<Node[]> {
    return this._schema.deleteMany(fields);
  }

  public async save(node: Node): Promise<Node> {
    const targetNode = new this._schema(node);
    const storedNode = await targetNode.save();

    return { ...storedNode, id: storedNode._id };
  }
}

export = NodeCollection;
