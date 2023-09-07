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
import contentRouter from "./routes/Content.js";
import { deleteFile, readFile, uploadDefaultImageToProfileImages } from "./utils/aws_bucket_services.js";
import { bucketModel } from "./models/BucketKeys.js";
import { chatModel } from "./models/Chat.js";
import { createServer } from "http";
import { Server } from 'socket.io';

// App
export const app = express();
export const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: [
      process.env.FRONTEND_URI,
      "http://localhost:5000",
      "http://localhost:3000",
      "https://articverse.cyclic.app",
    ],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }
});

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


//initialize socket 
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  socket.on("messageSend", async () => {
    console.log("Added Chat");
    try {
      let chats = [];
      chats = await  chatModel.find({});
      io.emit("messageReceive", chats);
    } catch (error) {
      console.error(error);
    }
  });
});

// Routes
app.use("/users", usersRouter);
app.use("/setting", settingRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/chats", chatRouter);
app.use("/content", contentRouter);

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

app.post("/imgupload",uploadDefaultImageToProfileImages.single("image"),(req,res)=>{
  if(!req.file){
    return res.status(404).json({success:false,message:"no img provided"});
  }
  return res.status(200).json({success:true,message:`File Uploaded ${req.imagename}`});
})


//Error middlewares
app.use(errorMiddleware);
