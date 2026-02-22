import express from "express";
import cors from "cors";
import submissionRoutes from "./routes/submissionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  }),
);

// Routes
app.use("/api/submissions", submissionRoutes);
app.use("/api/reviews", reviewRoutes);

// Health check route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
