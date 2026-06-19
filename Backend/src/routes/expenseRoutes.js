import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createExpense, getMyExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.use(protect);

router.post("/", createExpense);
router.get("/my-expenses", getMyExpenses);

export default router;
