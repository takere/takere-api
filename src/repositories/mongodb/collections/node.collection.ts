import NodeRepository from '../../node.repository';
import Node from '../../../domain/node.domain';
import nodeSchema from '../schemas/node.schema';

class NodeCollection implements NodeRepository {
  private _schema: any;

  constructor() {
    this._schema = nodeSchema;
  }

  public async findOne(fields: object): Promise<Node> {
    const storedNode = await this._schema.findOne(fields);

    return storedNode ? { ...storedNode._doc, id: storedNode._doc._id } : null;
  }

  public async find(fields: object): Promise<Node[]> {
    return this._schema.find(fields);
  }

  public async deleteMany(fields: object): Promise<Node[]> {
    let nodes = this._schema.deleteMany(fields);

    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    return nodes;
  }

  public async insert(node: Node): Promise<Node> {
    const targetNode = new this._schema({ ...node, id: undefined, _id: undefined });
    const storedNode = await targetNode.save();

    return { ...storedNode._doc, id: storedNode._id };
  }
}

export = NodeCollection;
