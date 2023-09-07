import { chatModel } from "../models/Chat.js";

export const getChat = async (req, res) => {
  let chats = [];
  chats = await chatModel.find({});
  if (chats.length == 0) {
    return res.status(404).json({ message: false, message: "No Chats" });
  }
  res.status(200).json({ message: true, chats });
};

export const addChat = async (req, res) => {
  const { userID, userName, userProfileURL, chatMessage } = req.body;
  const response = await chatModel.create({
    userID,
    userName,
    userProfileURL,
    chatMessage,
  });
  if (!response) {
    return res
      .status(404)
      .json({ message: false, message: "Unable to add chat" });
  }
  let chats = await chatModel.find({});
  if (chats.length == 0) {
    return res.status(404).json({ message: false, message: "No Chats" });
  }
  res.status(200).json({ message: true, chats });
};
