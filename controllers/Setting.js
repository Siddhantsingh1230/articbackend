import { usersModel } from "./../models/Users.js";
import { deleteFile } from "../utils/aws_bucket_services.js";

export const updateProfile = async (req, res) => {
  const { firstname, lastname, email, changeEmailTo } = req.body;
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
        email: changeEmailTo,
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
  
  const result = await usersModel.findByIdAndDelete({ _id: req.user._id });
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "unable to delete",
    });
  }
  
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
