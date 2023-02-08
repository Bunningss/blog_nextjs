import mongoose, { Schema } from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      min: 10,
      max: 256,
    },
    Image: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Article: {
      type: String,
      required: true,
      min: 15,
    },
    Author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models?.article ||
  mongoose.model("article", articleSchema);
