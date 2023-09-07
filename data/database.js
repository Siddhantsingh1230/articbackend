import mongoose from "mongoose";
import { server } from "../app.js";

export const connectDBAndListen = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("DB Online");
      server.listen(process.env.PORT, () => {
        console.log(`App running on PORT ${process.env.PORT}`);
      });
    })
    .catch((e) => {
      console.log("Error", e);
    });
};