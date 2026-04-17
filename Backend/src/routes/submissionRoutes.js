// Backend/src/routes/submissionRoutes.js - FIXED VERSION
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createSubmission,
  getPendingSubmissions,
  getMySubmissions,
  reviewSubmission,
} from "../controllers/submissionController.js";

const router = express.Router();

// ✅ FIX: IC and Senior IC can create submissions
router.post("/", protect, authorize("IC", "Senior IC"), createSubmission);

// ✅ Manager can view all pending submissions
router.get("/pending", protect, authorize("Manager"), getPendingSubmissions);

// ✅ NEW: Employees can view their own submissions
router.get(
  "/my-submissions",
  protect,
  authorize("IC", "Senior IC"),
  getMySubmissions,
);

// ✅ NEW: Manager can review a submission
router.put(
  "/:submissionId/review",
  protect,
  authorize("Manager"),
  reviewSubmission,
);

export default router;
