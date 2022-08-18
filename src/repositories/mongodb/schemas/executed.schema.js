const mongoose = require('mongoose');

const ExecutedSchema = new mongoose.Schema({
    result: {
      type: String,
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

ExecutedSchema.statics.create = async function (result, node) {
    const Executed = this.model('Executed')
    const executed = new Executed({result, node})
    return await executed.save()
}

ExecutedSchema.pre("save", function(next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});

module.exports = new mongoose.model('Executed', ExecutedSchema);
