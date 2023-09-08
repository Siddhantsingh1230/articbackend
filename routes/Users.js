import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUser,
  login,
  signup,
  logout,
} from "../controllers/Users.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { verifyEmail } from "../middlewares/email_verifier.js";

router.get("/all", getAllUsers);
router.post("/login", login);
router.get("/logout", logout);
router.post("/signup", verifyEmail, signup);
router.get("/me", isAuthenticated, getUser);

export default router;
