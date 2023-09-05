import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userName:{
    type:String,
    required: true,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  comment:{
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const commentsModel = mongoose.model("comments", commentsSchema);
