import { likesModel } from "../models/Likes.js";

export const isLiked = async (req, res) => {
  //   const { _id } = req.user;
  const { postID, userID } = req.body;
  const like = await likesModel.find({userID,postID});
  if(!like){
    return res.status(200).json({ success: true, message: false });
  }
  
  res.status(200).json({ success: true, message: true });
};