import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createFormTemplate,
  deleteFormTemplate,
  getFormTemplate,
  getMyFormTemplates,
  updateFormTemplate,
} from "../controllers/formTemplateController.js";

const router = express.Router();

router.use(protect);

router.post("/", createFormTemplate);
router.get("/my-forms", getMyFormTemplates);
router.get("/:id", getFormTemplate);
router.put("/:id", updateFormTemplate);
router.delete("/:id", deleteFormTemplate);

export default router;
