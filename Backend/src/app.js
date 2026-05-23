import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"; // Highly recommended for debugging
import { apiLimiter } from "./middleware/rateLimiter.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 1. SECURITY & CORS (Should always be first)
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 2. LOGGING (See requests in your console)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3. PARSING
app.use(express.json({ limit: "10kb" })); // Security: limit payload size

// 4. RATE LIMITING (Apply to all API routes)
app.use("/api/", apiLimiter);

// 5. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/reviews", reviewRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 6. ERROR HANDLING
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

export default app;
