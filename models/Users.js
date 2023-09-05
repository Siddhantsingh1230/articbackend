import mongoose from "mongoose";
import { postsModel } from "./Posts.js";
import { deleteFileNR } from "../utils/aws_bucket_services.js";

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  profileImageURL: {
    type: String,
    default: "profile_images/user_placeholder.png",
  },
});

// Define a pre-remove middleware for the User model
usersSchema.pre("findOneAndDelete", async function (doc) {
  if (doc) {
    // Remove files associated with the user's posts
    const posts = await postsModel.find({ userID: doc._id });
    posts.forEach((post) => {
      deleteFileNR(post.postURL);
    });
    // Remove all related posts
    await postsModel.deleteMany({ userID: doc._id });
  }
});

export const usersModel = mongoose.model("users", usersSchema);
