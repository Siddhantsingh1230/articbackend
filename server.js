import { app } from "./app.js";
import { connectDB } from "./data/database.js";

// Database connection
connectDB();
// Start APP
app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`);
});
