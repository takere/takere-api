/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import NodeRepository from '../../node.repository';
import Node from '../../../domain/node.domain';
import NodeSchema from '../schemas/node.schema';


class NodeCollection implements NodeRepository {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly schema: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.schema = mongoose.model<Node>("Node", NodeSchema);
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findById(id: string): Promise<Node> {
    const storedNode = await this.schema.findOne({ _id: id });

    return storedNode ? { ...storedNode._doc, id: storedNode._doc._id } : null;
  }

  public async findAllByFlowId(id: string): Promise<Node[]> {
    return this.schema.find({ flow: id });
  }

  public async removeAllWithFlowID(flowId: string): Promise<Node[]> {
    let nodes = this.schema.deleteMany({ flow: flowId });

    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    return nodes;
  }

  public async insert(node: Node): Promise<Node> {
    const targetNode = new this.schema({ ...node, id: undefined, _id: undefined });
    const storedNode = await targetNode.save();

    return { ...storedNode._doc, id: storedNode._id };
  }
}

export default NodeCollection;
