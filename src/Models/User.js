import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      min: 5,
      max: 256,
    },
    Profile: {
      type: String,
      required: false,
    },
    Email: {
      type: String,
      required: true,
      min: 5,
      max: 256,
    },
    Password: {
      type: String,
      required: true,
      min: 8,
      max: 256,
    },
    IsAuthor: {
      type: Boolean,
      default: false,
      required: false,
      enum: [true, false],
    },
    Articles: {
      type: [Schema.Types.ObjectId],
      ref: "Articles",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
