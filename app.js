import express from "express";
import path from "path";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import usersRouter from "./routes/Users.js";
import settingRouter from "./routes/Setting.js";
import { fileExist, readFile, uploadImage } from "./utils/aws_bucket_services.js";

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
    ],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use("/users", usersRouter);
app.use("/setting", settingRouter);

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

// img upload route to aws s3
app.post("/imgupload", uploadImage.single("image"), (req, res) => {
  res.status(200).json({ success: true, message: "Uploaded Successfully" });
});

// File read route from aws s3
app.get("/read/:file", (req, res) => {
  const { file } = req.params;
  readFile(file,res);
});

app.get("/fileexist/:file",(req,res)=>{
  const { file } = req.params;
  fileExist(file,res);
  
});

//Error middlewares
app.use(errorMiddleware);
