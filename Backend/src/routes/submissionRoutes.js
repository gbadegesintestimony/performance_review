import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createSubmission,
  getPendingSubmissions,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", protect, authorize("IC"), createSubmission);
router.get("/pending", protect, authorize("Manager"), getPendingSubmissions);

export default router;
