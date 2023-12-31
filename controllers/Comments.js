import { commentsModel } from "../models/Comments.js";
import { usersModel } from "../models/Users.js";

export const getAllComments = async (req, res) => {
  try {
    const { postID } = req.body;
    const comments = await commentsModel.find({ postID });
    if (comments.length === 0) {
      return res.status(404).json({ success: true, message: "No comments" });
    }
    res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.status(404).json({ success: false, message: error });
  }
};

export const createComment = async (req, res) => {
  const { postID, userID ,userName,comment,userProfileURL } = req.body;
  const commentres = await commentsModel.create({ userID, postID,userName,comment,userProfileURL });
  if (!commentres) {
    return res.status(404).json({ success: false, message: "Comment failed" });
  }
  const comments = await commentsModel.find({});
  res.status(200).json({ success: true, message: "Comment done" ,comments });
};
