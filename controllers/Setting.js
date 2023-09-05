import { usersModel } from "./../models/Users.js";
import { deleteFile } from "../utils/aws_bucket_services.js";
import { bucketModel } from "../models/BucketKeys.js";
import { postsModel } from "../models/Posts.js";
import { likesModel } from "../models/Likes.js";

export const updateProfile = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  let user = await usersModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });
  }
  const result = await usersModel.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: {
        firstname,
        lastname,
      },
    }
  );
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Unable to update",
    });
  }
  user = await usersModel.findOne({ _id: user._id });
  res.status(200).json({ success: true, message: "Profile updated ", user });
};

export const deleteProfile = async (req, res) => {
  if (req.user.profileImageURL !== "profile_images/user_placeholder.png") {
    deleteFile(req.user.profileImageURL);
  }
  await bucketModel.deleteOne({
    key: req.user.profileImageURL,
  });

  const result = await usersModel.findByIdAndDelete({ _id: req.user._id });
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "unable to delete",
    });
  }
  // Remove files associated with the user's posts
  const posts = await postsModel.find({ userID: req.user._id });
  posts.forEach((post) => {
    deleteFile(post.postURL,res);
  });
  
  //remove all related Likes
  const response = await likesModel.deleteMany({userID:req.user._id});
  if(!response){
      return res.status(404).json({success:false,message:"Error while deleting likes of this user"});
  }

  // Remove all related posts
  await postsModel.deleteMany({ userID: req.user._id });
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, message: "Profile deleted" });
};

export const updateProfilePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Request failed" });
  }
  let { user, imagename } = req;

  if (req.user.profileImageURL !== "profile_images/user_placeholder.png") {
    deleteFile(req.user.profileImageURL);
  }

  await bucketModel.create({
    key: imagename,
  });

  const result = await usersModel.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: {
        profileImageURL: imagename,
      },
    }
  );
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Unable to update",
    });
  }
  user = await usersModel.findOne({ _id: user._id });
  res.status(200).json({ success: true, message: "Profile updated ", user });
};
