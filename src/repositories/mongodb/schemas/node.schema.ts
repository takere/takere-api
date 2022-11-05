import mongoose from "mongoose";
import Node from "../../../domain/node.domain";
import DocumentResult from "../document-result";


interface NodeDocument extends DocumentResult<Node> {}

const NodeSchema = new mongoose.Schema<NodeDocument>({
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
    input_list: {
      type: Array,
      required: true,
    },
    output_list: {
      type: Array,
      required: true
    },
    content_type: {
      type: String,
    },
    parameters: {
      type: Array,
      required: true,
    },
    icons: {
      type: Array,
    },
    arguments: {
      type: Array,
    },
    position: {
      type: Object,
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

NodeSchema.pre("save", function(next) {
  if (this.isNew) {
     this._doc.id = this._id;
  }
  next();
});

export default NodeSchema;
