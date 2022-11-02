import mongoose from "mongoose";

const FinishedSchema = new mongoose.Schema({
    answers: {
      type: Array,
      required: false,
    },
    node: {
      type: mongoose.Schema.ObjectId,
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
    const Finished = this.model('Finished')
    const finishedInstance = new Finished({answers, node})
    return await finishedInstance.save()
}

FinishedSchema.pre("save", function(next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});

export default new mongoose.model('Finished', FinishedSchema);
