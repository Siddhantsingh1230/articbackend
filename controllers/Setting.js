import { usersModel } from "./../models/Users.js";

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
        email:changeEmailTo,
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
export const updateProfilePhoto = async () => {};
