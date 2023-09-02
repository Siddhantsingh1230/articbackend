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
    default:"image",
  },
  postCaption: {
    type: String,
    required: true,
  },
  postLikes: {
    type: Number,
    required: true,
    default:0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  postURL: {
    type: String,
    required:true,
  },
});

export const postsModel = mongoose.model("posts", postsSchema);
