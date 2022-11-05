import mongoose from "mongoose";
import Edge from "../../../domain/edge.domain";
import DocumentResult from "../document-result";


interface EdgeDocument extends DocumentResult<Edge> {}

const EdgeSchema = new mongoose.Schema<EdgeDocument>({
    source: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Node',
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Node',
    },
    animated: {
      type: Boolean,
      required: false,
      default: true
    },
    flow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flow',
      required: true
    },
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false,
  })

EdgeSchema.pre("save", function(next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});

export default EdgeSchema;
