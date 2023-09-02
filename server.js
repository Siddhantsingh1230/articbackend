import { connectDB } from "./data/database.js";
import { app } from "./app.js";
// Database connection and  APP Listens

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`);
});
