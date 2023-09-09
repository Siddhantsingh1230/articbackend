import jwt from "jsonwebtoken";
import { usersModel } from "../models/Users.js";
import { sendResetMail } from "../utils/services.js";

export const forgotpwd = async (req,res)=>{
    const {email} = req.body;
    const user = await usersModel.findOne({email});
    if(!user){
        return res.status(404).json({success:false,message:"User not found!"});
    }
    const secret =  process.env.JWT_KEY + user.password;
    const payload = {
        email,
        _id:user._id,
    }
    const token = jwt.sign(payload,secret,{expiresIn:"15m"});
    const link = `https://articverse.vercel.app/resetpwd?id=${user._id}&token=${token}`;
    await sendResetMail(user.firstname,new Date().toLocaleDateString(),process.env.FROM,process.env.PASS,user.email,"Artic:Reset Password");
    res.status(200).json({success:true,message:"Check your mail"});
    
}
export const resetpwd = async (req,res)=>{
    
}