// Backend/src/controllers/submissionController.js - FIXED VERSION
import {
  createSubmissionService,
  getPendingSubmissionsService,
  getMySubmissionsService,
  reviewSubmissionService,
} from "../services/submissionServices.js";

export const createSubmission = async (req, res) => {
  try {
    console.log("Creating submission for user:", req.user._id);
    console.log("Submission data:", req.body);

    const submission = await createSubmissionService(req.body, req.user._id);

    console.log("Submission created successfully:", submission._id);

    res.status(201).json({
      success: true,
      data: submission,
      message: "Submission created successfully",
    });
  } catch (error) {
    console.error("Create submission error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingSubmissions = async (req, res) => {
  try {
    console.log("Fetching pending submissions for manager:", req.user._id);

    const submissions = await getPendingSubmissionsService();

    console.log(`Found ${submissions.length} pending submissions`);

    res.json({
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("Get pending submissions error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ NEW: Get employee's own submissions
export const getMySubmissions = async (req, res) => {
  try {
    console.log("Fetching submissions for employee:", req.user._id);

    const submissions = await getMySubmissionsService(req.user._id);

    console.log(`Found ${submissions.length} submissions for this employee`);

    res.json({
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("Get my submissions error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ NEW: Review submission (mark as reviewed)
export const reviewSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { rating, feedback } = req.body;

    console.log(
      "Reviewing submission:",
      submissionId,
      "by manager:",
      req.user._id,
    );

    const submission = await reviewSubmissionService(
      submissionId,
      req.user._id,
      { rating, feedback },
    );

    res.json({
      success: true,
      data: submission,
      message: "Submission reviewed successfully",
    });
  } catch (error) {
    console.error("Review submission error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
