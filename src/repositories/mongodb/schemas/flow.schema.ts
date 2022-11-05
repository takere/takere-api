import mongoose from "mongoose";
import Flow from "../../../domain/flow.domain";
import DocumentResult from "../document-result";


interface FlowDocument extends DocumentResult<Flow> {}

const FlowSchema = new mongoose.Schema<FlowDocument>({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
     type: String,
     trim: true
    },
    patientEmail: {
     type: String,
     trim: true
    },
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false,
  })

FlowSchema.pre("save", function(next) {
  if (this.isNew) {
     this._doc.id = this._id;
  }
  next();
});

FlowSchema.pre("remove", function(next) {
  this.model('Flow').remove({ flow: this._id });

  next();
});

export default FlowSchema;
