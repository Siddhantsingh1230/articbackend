import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, status = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message,
    });
};