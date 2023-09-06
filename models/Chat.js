import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userName:{
    type:String,
    required: true,
  },
  userProfileURL:{
    type:String,
    required: true,
  },
  chatMessage:{
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const chatModel = mongoose.model("chat", chatSchema);
