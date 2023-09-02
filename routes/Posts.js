import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { uploadImageToPosts } from "../utils/aws_bucket_services.js";
import {uploadPost,deletePost,updatePost,getAllPosts} from "../controllers/Posts.js"

router.post(
  "/upload",
  isAuthenticated,
  uploadImageToPosts.single("posts"),
  uploadPost
);
router.post("/delete/:postid", isAuthenticated, deletePost);
router.post("/update/:postid", isAuthenticated, updatePost);
router.get("/getAllPosts", isAuthenticated, getAllPosts);

export default router;
