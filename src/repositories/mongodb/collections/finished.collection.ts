/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import FinishedRepository from '../../finished.repository';
import Finished from '../../../domain/finished.domain';
import FinishedDTO from '../../../dto/finished.dto';
import FinishedSchema from "../schemas/finished.schema";


class FinishedCollection implements FinishedRepository {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly schema: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.schema = mongoose.model<Finished>("Finished", FinishedSchema);
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async save(finished: FinishedDTO): Promise<Finished> {
    const storedFinished = await this.schema.create(finished.answers, finished.node);

    return { ...storedFinished, id: storedFinished._id };
  }

  public async removeAllWithNodeId(id: any): Promise<Finished[]> {
    return this.schema.deleteMany({ node: id });
  }
}

export default FinishedCollection;
