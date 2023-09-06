import express from "express";
import path from "path";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import usersRouter from "./routes/Users.js";
import settingRouter from "./routes/Setting.js";
import postsRouter from "./routes/Posts.js";
import likesRouter from "./routes/Likes.js";
import commentsRouter from "./routes/Comments.js";
import chatRouter from "./routes/Chat.js";
import { deleteFile, readFile } from "./utils/aws_bucket_services.js";
import { bucketModel } from "./models/BucketKeys.js";

// App
export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
      "http://localhost:5000",
      "http://localhost:3000",
      "https://articverse.cyclic.app",
    ],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use("/users", usersRouter);
app.use("/setting", settingRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/chats", chatRouter);

//environment variables
configDotenv({
  path: "./data/config.env",
});

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "online",
  });
});

// File read route from aws s3
app.get("/read/:dir/:file", (req, res) => {
  const dir = req.params["dir"];
  const file = req.params["file"];
  readFile(`${dir}/${file}`, res);
});

// Only for Dev purposes
app.get("/deleteBucket", async (req, res) => {
  const bucket = await bucketModel.find({});
  bucket.forEach((item) => {
    deleteFile(item.key, res);
  });
  const resp = await bucketModel.deleteMany({});
  if (!resp) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete from bucket" });
  }
  res.status(200).json({ success: true, message: "Deleted Bucket" });
});

//Error middlewares
app.use(errorMiddleware);
