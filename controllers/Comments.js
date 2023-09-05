import { commentsModel } from "../models/Comments.js";
import { usersModel } from "../models/Users.js";

export const getAllComments = async (req, res) => {
  try {
    const { postID } = req.body;
    const comments = await commentsModel.find({ postID });
    if (comments.length === 0) {
      return res.status(200).json({ success: true, message: "No comments" });
    }
    let profileURLArray = [];
    for (const comment of comments) {
      const user = await usersModel.findById({ _id: comment.userID });
      const { data } = axios.get(
        `https://articverse.cyclic.app/read/${user.profileImageURL}`,
        {
          withCredentials: true,
        }
      );
      profileURLArray.push(data.fileUrl);
    }

    res.status(200).json({ success: true, comments, profileURLArray });
  } catch (error) {
    return res.status(404).json({ success: false, message: error });
  }
};

export const createComment = async (req, res) => {
  const { postID, userID } = req.body;
  const comment = await commentsModel.create({ userID, postID });
  if (!comment) {
    return res.status(404).json({ success: false, message: "Comment failed" });
  }
  res.status(200).json({ success: truee, message: "Comment done" });
};
