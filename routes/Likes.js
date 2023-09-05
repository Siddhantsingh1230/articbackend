import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { isLiked,liked,unliked } from "../controllers/Likes.js";
const router = express.Router();

router.post("/liked", isAuthenticated, liked);
router.post("/unliked", isAuthenticated, unliked);
router.post("/isliked", isAuthenticated,isLiked);

export default router;
