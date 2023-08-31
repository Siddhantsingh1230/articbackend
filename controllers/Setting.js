import { usersModel } from "./../models/Users.js";
import fs from "fs";
import path from "path";

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
  const result = await usersModel.findByIdAndDelete({ _id: req.user._id });
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "unable to delete",
    });
  }
  if (req.user.profileImageURL !== "user_placeholder.png") {
    const imagePath = path.join(
      path.resolve(),
      `public/profile_images/${req.user.profileImageURL}`
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    console.log("profile image cleaned");
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

  if (req.user.profileImageURL !== "user_placeholder.png") {
    const imagePath = path.join(
      path.resolve(),
      `public/profile_images/${req.user.profileImageURL}`
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    console.log("profile image cleaned");
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
