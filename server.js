import { connectDB } from "./data/database.js";
import {app} from "./app.js";

// Database connection and  APP Listens 
const init = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
  });
};

//Starting our App

init();