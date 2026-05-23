// Backend/src/routes/submissionRoutes.js - COMPLETE FIX
import express from "express";
import {
  createSubmission,
  getMySubmissions,
  getPendingSubmissions,
  reviewSubmission,
  markAsViewed,
  getSubmission,
} from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ All routes require authentication
router.use(protect);

// ✅ CREATE new submission (IC/Senior IC)
router.post("/", createSubmission);

// ✅ GET my submissions (IC/Senior IC)
router.get("/my-submissions", getMySubmissions);

// ✅ GET pending submissions (Manager only)
router.get("/pending", getPendingSubmissions);

// ✅ GET single submission
router.get("/:id", getSubmission);

// ✅ REVIEW submission (Manager approves/gives feedback)
router.put("/:id/review", reviewSubmission);

// ✅ MARK submission as viewed (IC marks manager feedback as read)
router.put("/:id/mark-viewed", markAsViewed);

export default router;
