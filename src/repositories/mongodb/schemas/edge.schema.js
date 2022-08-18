const mongoose = require('mongoose');

const EdgeSchema = new mongoose.Schema({
    source: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Node',
    },
    target: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: 'Node',
    },
    animated: {
      type: Boolean,
      required: false,
      default: true
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

EdgeSchema.pre("save", function(next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});


module.exports = new mongoose.model('Edge', EdgeSchema);
