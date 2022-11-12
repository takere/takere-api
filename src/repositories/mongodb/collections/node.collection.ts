import mongoose from "mongoose";
import NodeRepository from '../../node.repository';
import Node from '../../../domain/node.domain';
import NodeSchema from '../schemas/node.schema';

class NodeCollection implements NodeRepository {
  private _schema: any;

  constructor() {
    this._schema = mongoose.model<Node>("Node", NodeSchema);
  }

  public async findById(id: string): Promise<Node> {
    const storedNode = await this._schema.findOne({ _id: id });

    return storedNode ? { ...storedNode._doc, id: storedNode._doc._id } : null;
  }

  public async findAllByFlowId(id: string): Promise<Node[]> {
    return this._schema.find({ flow: id });
  }

  public async removeAllWithFlowID(flowId: string): Promise<Node[]> {
    let nodes = this._schema.deleteMany({ flow: flowId });

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

export default NodeCollection;
