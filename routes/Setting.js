import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { updateProfile, deleteProfile, updateProfilePhoto } from "../controllers/Setting.js";
import {upload} from "../utils/services.js"

router.post("/update", isAuthenticated, updateProfile);
router.post("/userphoto",isAuthenticated,upload.single('image'), updateProfilePhoto);
router.get("/deleteprofile", isAuthenticated, deleteProfile);

export default router;
