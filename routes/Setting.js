import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { updateProfile, updateProfilePhoto ,deleteProfile } from "../controllers/Setting.js";

router.post("/update", isAuthenticated, updateProfile);
router.post("/userphoto", isAuthenticated, updateProfilePhoto);
router.post("/deleteprofile", isAuthenticated, deleteProfile);

export default router;
