import { postsModel } from "../models/Posts.js";
import { usersModel } from "../models/Users.js";

export const getAllContent = async (req, res) => {
  const content = await postsModel.find({});
  let contentArray = [];
  if (!content) {
    return res
      .status(404)
      .json({ success: false, message: "failed to fetch content" });
  }
  for (const post of content) {
    const user = await usersModel.findById({
      _id: post.userID,
    });
    let obj = {...post.toObject(),userName:user.firstname + " " + user.lastname,userProfileLink:user.profileImageURL};
    const timeGap = post.createdAt - Date.now();
    const twentyFourHrs = 5 * 60 * 1000; // 5 min only
    if (timeGap < twentyFourHrs) {
      obj = {...obj,isNew:true};
    } else {
        obj = {...obj,isNew:false};
    }
    contentArray.push(obj);
  };
  res.status(200).json({
    success: true,
    content:contentArray,
  });
};
