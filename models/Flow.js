require('dotenv').config();
const mongoose = require('mongoose');

const FlowSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
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

const Flow = new mongoose.model('Flow', FlowSchema)
module.exports = Flow
