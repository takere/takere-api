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
    userEmail: {
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

module.exports = new mongoose.model('Flow', FlowSchema);
