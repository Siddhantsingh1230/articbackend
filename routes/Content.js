import express from "express";
import { getAllContent} from "../controllers/Content.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.get("/getAllContent/:item",isAuthenticated,getAllContent);

export default router;
