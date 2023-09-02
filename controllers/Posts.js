import { postsModel } from "../models/Posts.js";
import { bucketModel } from "../models/BucketKeys.js";

export const uploadPost = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ success: false, message: "Request failed" });
  }
  const { postCaption } = req.body;
  const { _id } = req.user;
  const postURL = req.postname;

  await postsModel.create({
    userID:_id,
    postCaption,
    postURL,
  });
   await bucketModel.create({
    key:req.postname,
  });
  
  console.log("post created: ", post);
  res.status(201).json({ success: true, message: "Post created!" });
};

export const deletePost = async () => {};

export const updatePost = async () => {};

export const getAllPosts = async () => {};
