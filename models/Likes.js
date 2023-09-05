import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const likesModel = mongoose.model("likes", likesSchema);
