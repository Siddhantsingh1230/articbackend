import { postsModel } from "../models/Posts.js";
import { usersModel } from "../models/Users.js";

export const getAllContent = async (req, res) => {
  const content = await postsModel.find({});
  if (!content) {
    return res
      .status(404)
      .json({ success: false, message: "failed to fetch content" });
  }
  content.forEach((post) => {
    const user = usersModel.find({
      _id: post.userID,
    });
    post["userName"] = user.firstname + " " + user.lastname;
    post["userProfileLink"] = user.profileImageURL;
    const timeGap = post.createdAt - Date.now();
    const twentyFourHrs = 24 * 60 * 60 * 1000;
    if (timeGap < twentyFourHrs) {
      post[isNew] = true;
    } else {
      post[isNew] = false;
    }
  });
  res.status(200).json({
    success: true,
    content,
  });
};
