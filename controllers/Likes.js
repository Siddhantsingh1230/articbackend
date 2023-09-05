import { likesModel } from "../models/Likes.js";

export const isLiked = async (req, res) => {
  //   const { _id } = req.user;
  try {
    const { postID, userID } = req.body;
    const like = await likesModel.find({ userID, postID });
    if (!like) {
      return res.status(200).json({ success: true, message: false });
    }

    res.status(200).json({ success: true, message: true });
  } catch (error) {
    return res.status(404).json({ success: false, message: error });
  }
};
