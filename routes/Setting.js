import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { updateProfile, deleteProfile, updateProfilePhoto } from "../controllers/Setting.js";
import { uploadImageToProfileImages } from "../utils/aws_bucket_services.js";

router.post("/update", isAuthenticated, updateProfile);
router.post("/userphoto",isAuthenticated,uploadImageToProfileImages.single('image'), updateProfilePhoto);
router.get("/deleteprofile", isAuthenticated, deleteProfile);

export default router;
