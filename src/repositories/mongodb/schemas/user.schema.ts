import mongoose from "mongoose";
import User from "../../../domain/user.domain";
import DocumentResult from "../document-result";


interface UserDocument extends DocumentResult<User> {}

const UserSchema = new mongoose.Schema<UserDocument>(
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

UserSchema.pre("save", function (next) {
  next();
});

export default UserSchema;
