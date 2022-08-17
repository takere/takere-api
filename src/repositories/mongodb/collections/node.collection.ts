import NodeRepository from "../../node.repository";
import Node from "../../../domain/node.domain";

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
    const storedNode = await this._schema.find(fields);

    return [ ...storedNode._doc ];
  }

  public async deleteMany(fields: object): Promise<void> {
    return this._schema.deleteMany(fields);
  }

  public async save(node: Node): Promise<Node> {
    const storedNode = await this._schema.save({ ...node, _id: node.id });

    return { ...storedNode, id: storedNode._id };
  }
}

module.exports = NodeCollection;
