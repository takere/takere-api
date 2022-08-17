const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    profileUrl: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", function (next: any) {
  next();
});

module.exports = new mongoose.model("User", UserSchema);
