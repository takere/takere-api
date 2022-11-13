/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import FlowRepository from '../../flow.repository';
import Flow from '../../../domain/flow.domain';
import FlowDTO from '../../../dto/flow.dto';
import FlowSchema from "../schemas/flow.schema";


class FlowCollection implements FlowRepository {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly schema: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.schema = mongoose.model<Flow>("Flow", FlowSchema);
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow> {
    const storedFlow = await this.schema.findOne({ author: authorId, _id: flowId });

    return { ...storedFlow._doc, id: storedFlow._doc._id };
  }

  public async removeByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow> {
    const storedFlow = await this.schema.findOneAndRemove({ author: authorId, _id: flowId });

    return { ...storedFlow._doc, id: storedFlow._doc._id };
  }

  public async findById(id: string): Promise<Flow> {
    return this.schema.findOne({ _id: id });
  }

  public async findAllByAuthor(authorId: string): Promise<Flow[]> {
    return this.schema.find({ author: authorId });
  }

  public async save(flow: FlowDTO): Promise<Flow> {
    const targetFlow = new this.schema({ ...flow, id: undefined });
    const storedFlow = await targetFlow.save();

    return { ...storedFlow._doc, id: storedFlow._id };
  }
}

export default FlowCollection;
