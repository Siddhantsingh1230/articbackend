import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { isLiked } from "../controllers/Likes.js";
const router = express.Router();

router.post("/liked", isAuthenticated, (req, res) => {});
router.put("/unliked", isAuthenticated, (req, res) => {});
router.post("/isliked",isLiked);

export default router;
