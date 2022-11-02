import mongoose from "mongoose";
import boardModel from './board.schema';

const FlowSchema = new mongoose.Schema({
    author: {
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
  boardModel.remove({ flow: this._id });

  next();
});

export default new mongoose.model('Flow', FlowSchema);
