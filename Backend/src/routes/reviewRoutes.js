import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, authorize("Manager"), createReview);

export default router;
