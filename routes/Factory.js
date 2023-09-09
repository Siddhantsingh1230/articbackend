import express from "express";
import { forgotpwd,resetpwd } from "../controllers/Factory.js";
const router = express.Router();

router.post("/forgotpassword", forgotpwd);
router.post("/resetpassword", resetpwd);

export default router;
