import { postsModel } from "../models/Posts.js";

export const uploadPost = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ success: false, message: "Request failed" });
  }
  const { postCaption, userID } = req.body;
  const postURL = req.postname;

  post = await postsModel.create({
    userID,postCaption,postURL
  });
  console.log("post created:",post);
  res.status(201).json({success:true,message:"Post created!"});


};

export const deletePost = async () => {};

export const updatePost = async () => {};

export const getAllPosts = async () => {};
