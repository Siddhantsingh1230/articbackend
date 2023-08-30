import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { updateProfile, updateProfilePhoto } from "../controllers/Setting.js";

router.post("/update", isAuthenticated, updateProfile);
router.post("/userphoto", isAuthenticated, updateProfilePhoto);

export default router;
