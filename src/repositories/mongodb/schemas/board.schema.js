const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    patientEmail: {
      type: String,
      required: true,
      trim: true,
    },
    flow: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Flow",
    },
    node: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Node",
    },
    finished: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: "Finished",
    }
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false,
  }
);

BoardSchema.statics.findById = async function (id) {
  return this.model("Board").findOne({ _id: id })
    .populate("node")
    .populate("finished")
    .exec();;
}

BoardSchema.statics.findAllUnfinishedByEmail = async function (email) {
  return this.model("Board").find({ patientEmail: email, finished: undefined })
    .populate("node")
    .exec();
};

BoardSchema.statics.findAllFinishedByEmail = async function (email) {
  return this.model("Board").find({ patientEmail: email, finished: {$ne:undefined} })
    .populate("node")
    .exec();
};

BoardSchema.statics.findAllByEmail = async function (email) {
  return this.model("Board").find({ patientEmail: email })
    .populate("node")
    .populate("finished")
    .exec();
};


BoardSchema.pre("save", function (next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});

module.exports = new mongoose.model("Board", BoardSchema);
