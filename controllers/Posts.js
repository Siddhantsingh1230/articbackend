import { postsModel } from "../models/Posts.js";
import { bucketModel } from "../models/BucketKeys.js";
import { deleteFile } from "../utils/aws_bucket_services.js";

export const uploadPost = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ success: false, message: "Request failed" });
  }
  const { postCaption } = req.body;
  const { _id } = req.user;
  const postURL = req.postname;

  const post = await postsModel.create({
    userID: _id,
    postCaption,
    postURL,
  });
  await bucketModel.create({
    key: req.postname,
  });

  console.log("post created: ", post);
  res.status(201).json({ success: true, message: "Post created!" });
};

export const deletePost = async (req, res) => {
  const { _id,postURL } = req.body.post;
  deleteFile(postURL,res);
  await postsModel.findByIdAndDelete(
    { _id },
  );
  const bucket = await bucketModel.findOne({key:postURL});
  await bucketModel.findByIdandDelete({_id:bucket._id});
  res.status(200).json({success:true,message:"Post deleted"});
};

export const updatePost = async (req, res) => {
  const { _id, postCaption } = req.body;
  const result = await postsModel.findByIdAndUpdate(
    { _id },
    {
      $set: {
        postCaption,
      },
    }
  );
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Unable to update",
    });
  }
  res.status(200).json({ success: true, message: "Post updated " });
};

export const getAllPosts = async (req, res) => {
  const { _id } = req.user;
  const posts = await postsModel.find({
    userID: _id,
  });
  if (!posts) {
    return res
      .status(404)
      .json({ success: false, message: "failed to fetch posts" });
  }
  res.status(200).json({
    success: true,
    posts: posts,
  });
};
