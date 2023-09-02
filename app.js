import express from "express";
import path from "path";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import usersRouter from "./routes/Users.js";
import settingRouter from "./routes/Setting.js";
import postsRouter from "./routes/Posts.js";
import { readFile } from "./utils/aws_bucket_services.js";

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
app.use("/posts", postsRouter);

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

//Error middlewares
app.use(errorMiddleware);
