import jwt from "jsonwebtoken";
import { usersModel } from "../models/Users.js";

export const forgotpwd = async (req,res)=>{
    const {email} = req.body;
    const user = await usersModel.findOne({email});
    if(!user){
        return res.status(404).json({success:false,message:"User not found!"});
    }
    const secret =  process.env.JWT_KEY + user.password;
    const payload = {
        email:user.email,
        _id:user._id,
    }
    const token = jwt.sign(payload,secret,{expiresIn:"15m"});
    const link = `https:articverse.cyclic.cloud/resetpwd.html/?id=${user._id}&token=${token}`;
    console.log(link);
    res.send("password resent send ",link);
    
}
export const resetpwd = async (req,res)=>{
    
}