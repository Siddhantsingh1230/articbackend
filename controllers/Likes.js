import { likesModel } from "../models/Likes.js";
import { postsModel } from "../models/Posts.js";

export const isLiked = async (req, res) => {
  //   const { _id } = req.user;
  try {
    const { postID, userID } = req.body;
    const like = await likesModel.find({ userID, postID });
    if (!like) {
      return res.status(400).json({ success: true, message: false });
    }
    res.status(200).json({ success: true, message: true });
  } catch (error) {
    return res.status(404).json({ success: false, message: error });
  }
};

export const liked = async (req,res) =>{
    const {userID,postID} = req.body;
    const liked = await likesModel.create({userID,postID});
    if(!liked){
        return res.status(404).json({success:false,message:"Error while liking"});
    }
    const post = await postsModel.findByIdAndUpdate({_id:postID},{ $inc: { postLikes: 1 }});
    if(!post){
        return res.status(404).json({success:false,message:"Like INC Error"});
    }
    res.status(200).json({success:true,message:"Liked"});
}

export const unliked = async (req,res) =>{
    const {userID,postID} = req.body;
    const unliked = await likesModel.findOne({userID,postID});
    if(!unliked){
        return res.status(404).json({success:false,message:"Error while unliking"});
    }
    const post = await postsModel.findByIdAndUpdate({_id:postId},{ $inc: { postLikes: -1 }});
    if(!post){
        return res.status(404).json({success:false,message:"Like DEC Error"});
    }
    res.status(200).json({success:true,message:"unliked"});
}