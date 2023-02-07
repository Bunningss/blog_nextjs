import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    Profile: {
      type: String,
      require: false,
    },
    Email: {
      type: String,
      require: true,
    },
    Password: {
      type: String,
      require: true,
    },
    Author: {
      type: Boolean,
      default: false,
      require: false,
      enum: [true, false],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
