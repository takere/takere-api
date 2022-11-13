/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import EdgeRepository from '../../edge.repository';
import Edge from '../../../domain/edge.domain';
import EdgeDTO from '../../../dto/edge.dto';
import EdgeSchema from "../schemas/edge.schema";


class EdgeCollection implements EdgeRepository {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly schema: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.schema = mongoose.model<Edge>("Edge", EdgeSchema);
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findOne(fields: object): Promise<Edge> {
    const storedEdge = await this.schema.findOne(fields);

    return { ...storedEdge._doc, id: storedEdge._doc._id };
  }

  public async removeAllWithFlowId(id: string): Promise<Edge[]> {
    return this.schema.deleteMany({ flow: id });
  }

  public async findAllBySourceId(id: string): Promise<Edge[]> {
    return this.schema.find({ source: id });
  }

  public async findAllByFlowId(id: string): Promise<Edge[]> {
    return this.schema.find({ flow: id });
  }

  public async save(edge: EdgeDTO): Promise<Edge> {
    const targetEdge = new this.schema({ ...edge, id: undefined });
    const storedEdge = await targetEdge.save();

    return { ...storedEdge._doc, id: storedEdge._id };
  }
}

export default EdgeCollection;
