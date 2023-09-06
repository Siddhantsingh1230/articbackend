import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getChat,addChat } from "../controllers/Chat.js";

const router = express.Router();

router.get("/getchat", isAuthenticated, getChat);
router.post("/addchat", isAuthenticated, addChat);


export default router;
