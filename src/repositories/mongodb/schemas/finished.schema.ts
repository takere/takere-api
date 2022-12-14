/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import Finished from "../../../domain/finished.domain";
import DocumentResult from "../document-result";


interface FinishedDocument extends DocumentResult<Finished> {}

const FinishedSchema = new mongoose.Schema<FinishedDocument>(
  {
    answers: {
      type: Array,
      required: false,
    },
    node: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Node',
    },
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false,
  })

FinishedSchema.statics.create = async function (answers, node) {
    const Finished = this;
    const finishedInstance = new Finished({answers, node})
    
    return finishedInstance.save()
}

FinishedSchema.pre("save", function(next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});

export default FinishedSchema;