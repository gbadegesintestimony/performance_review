import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain uppercase, lowercase, and number"),

  body("role")
    .optional()
    .isIn(["IC", "SeniorIC", "Manager"])
    .withMessage("Role must be IC or SeniorIC or Manager"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export const validateSubmission = [
  body("reviewPeriod")
    .trim()
    .notEmpty()
    .withMessage("Review period is required"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .isLength({ max: 100 })
    .withMessage("Department name too long"),

  body("goals")
    .isArray({ min: 1 })
    .withMessage("At least one goal is required")
    .custom((goals) => {
      if (goals.some((goal) => typeof goal !== "string")) {
        throw new Error("All goals must be strings");
      }
      if (goals.some((goal) => goal.length > 500)) {
        throw new Error("Each goal must be less than 500 characters");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export const validateReview = [
  body("submissionId")
    .notEmpty()
    .withMessage("Submission ID is required")
    .isMongoId()
    .withMessage("Invalid submission ID"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be 1-5"),

  body("feedback")
    .trim()
    .notEmpty()
    .withMessage("Feedback is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Feedback must be 10-2000 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
