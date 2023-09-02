import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  postCaption: {
    type: String,
    required: true,
  },
  postLikes: {
    type: Number,
    select: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  postURL: {
    type: String,
  },
});

export const postsModel = mongoose.model("posts", postsSchema);
