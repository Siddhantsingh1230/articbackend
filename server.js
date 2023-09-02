import { connectDB } from "./data/database.js";
import { app } from "./app.js";

// Database connection and  APP Listens
const init = () => {
  connectDB().then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`App running on PORT ${process.env.PORT}`);
    });
  }).catch(e=>console.log("error"+e));
};

//Starting our App

init();
