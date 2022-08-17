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
    userEmail: {
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
    executed: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: "Executed",
    },
    completed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false,
  }
);

BoardSchema.statics.createBoard = async function (
  name,
  description,
  userEmail,
  flow,
  node,
  executed
) {
  const Board = this.model("Board");
  const board = new Board({
    name,
    description,
    userEmail,
    flow,
    node,
    executed,
  });
  await board.save();
  return board;
};

BoardSchema.statics.findByUserEmail = async function (userEmail) {
  const Board = this.model("Board");
  let boards = await Board.find({ userEmail: userEmail, completed: false })
    .populate("node")
    .populate("executed")
    .exec();
  if (!boards) throw new Error(`401`);
  return boards;
};

BoardSchema.statics.findById = async function (id) {
  const Board = this;
  return new Promise(async (resolve, reject) => {
    let flow = await Board.findOne({ _id: id });
    if (!flow) reject(401);
    resolve(flow);
  });
};

BoardSchema.pre("save", function (next) {
  if (this.isNew) {
    this._doc.id = this._id;
  }
  next();
});

const Board = new mongoose.model("Board", BoardSchema);
module.exports = Board;
