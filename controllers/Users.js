import { usersModel } from "./../models/Users.js";
import bcrypt from "bcrypt";
import { sendCookie,sendRegMail } from "../utils/services.js";

export const getAllUsers = async (req, res) => {
  const user = await usersModel.find({});
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "failed to fetch users" });
  }
  res.status(200).json({
    success: true,
    users: user,
  });
};

export const login = async (req, res) => {
  const { email, password ,remember } = req.body;
  let user = await usersModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "incorrect email or password",
    });
  }
  sendCookie(remember,user, res, `Welcome back, ${user.firstname}`);
};

export const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  let user = await usersModel.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await usersModel.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  sendCookie(false,user, res, "User created", 201);
  sendRegMail(user.firstname,new Date().toLocaleDateString(),process.env.FROM,process.env.PASS,user.email,"Registration successfull");
};

export const getUser = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logout = async (req, res) => { 
  const { token } = req.cookies;
  if(!token){
    return res.status(404).json({
        success:false,
        message:"Already Logout"
    })
  }
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, message: "Logout successfull" });
};
