import app from "./app.js";
import connectDB from "./config/db.js";

// Connect to DB once
connectDB();

export default app;
