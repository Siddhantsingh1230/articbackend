import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllComments,createComment } from "../controllers/Comments.js";

const router = express.Router();

router.post("/getAllComments", isAuthenticated, getAllComments);
router.post("/createComment",isAuthenticated,createComment);


export default router;
