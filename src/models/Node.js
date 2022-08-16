require('dotenv').config();
const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    data: {
      type: Object,
    },
    position: {
      type: Object,
    },
    flow: {
      type: mongoose.Schema.ObjectId,
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

const Node = new mongoose.model('Node', NodeSchema)
module.exports = Node
