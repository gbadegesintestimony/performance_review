// Backend/src/controllers/submissionController.js - COMPLETE FIX
import Submission from "../models/Submission.js";

//  CREATE SUBMISSION (IC/Senior IC submits review)
export const createSubmission = async (req, res) => {
  try {
    console.log(
      " Backend received submission data:",
      JSON.stringify(req.body, null, 2),
    );

    const incomingGrowthAreas = req.body.growthAreas || {};

    const growthAreas = {
      strengths:
        incomingGrowthAreas.strengths || incomingGrowthAreas.areas || [],
      areasForImprovement: incomingGrowthAreas.areasForImprovement || [],
      developmentGoals: incomingGrowthAreas.developmentGoals || [],
    };

    const submissionData = {
      reviewPeriod: req.body.reviewPeriod,
      department: req.body.department,
      employeeInfo: req.body.employeeInfo,
      goals: req.body.goals || [],
      competencies: req.body.competencies || {},
      growthAreas: growthAreas,
      selfEvaluation: req.body.selfEvaluation || {
        accomplishments: "",
        challenges: "",
        learnings: "",
        futureGoals: "",
      },
      overallRating: req.body.overallRating || "",
      submittedBy: req.user._id, // From auth middleware
      status: "pending",
      viewedByEmployee: false,
    };

    console.log(
      " Saving to database:",
      JSON.stringify(submissionData, null, 2),
    );

    const submission = await Submission.create(submissionData);

    console.log(" Successfully saved:", JSON.stringify(submission, null, 2));

    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: submission,
    });
  } catch (error) {
    console.error(" Create submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create submission",
      error: error.message,
    });
  }
};

//  GET MY SUBMISSIONS (IC/Senior IC view their submissions)
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      submittedBy: req.user._id,
    })
      .populate("submittedBy", "name email role department")
      .sort({ createdAt: -1 })
      .lean();

    console.log(
      ` Found ${submissions.length} submissions for user ${req.user._id}`,
    );

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error(" Get my submissions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

//  GET PENDING SUBMISSIONS (Manager view)
export const getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      status: "pending",
    })
      .populate("submittedBy", "name email role department")
      .sort({ createdAt: -1 })
      .lean();

    console.log(` Found ${submissions.length} pending submissions for manager`);

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error(" Get pending submissions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending submissions",
      error: error.message,
    });
  }
};

//  REVIEW SUBMISSION (Manager approves and gives feedback)
export const reviewSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback, reviewedBy, reviewerName } = req.body;

    console.log(`📝 Manager reviewing submission ${id}:`, {
      rating,
      feedback,
      reviewedBy,
      reviewerName,
    });

    const submission = await Submission.findByIdAndUpdate(
      id,
      {
        status: "reviewed",
        managerFeedback: {
          rating,
          feedback,
          reviewedBy,
          reviewerName,
          reviewedAt: new Date(),
        },
      },
      { new: true },
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    console.log("✅ Review saved successfully:", submission);

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: submission,
    });
  } catch (error) {
    console.error("❌ Review submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to review submission",
      error: error.message,
    });
  }
};

//  MARK SUBMISSION AS VIEWED (IC marks manager feedback as read)
export const markAsViewed = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(` Marking submission ${id} as viewed by employee`);

    const submission = await Submission.findByIdAndUpdate(
      id,
      { viewedByEmployee: true },
      { new: true },
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marked as viewed",
      data: submission,
    });
  } catch (error) {
    console.error(" Mark as viewed error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark as viewed",
      error: error.message,
    });
  }
};

//  GET SINGLE SUBMISSION (View details)
export const getSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id)
      .populate("submittedBy", "name email role department")
      .lean();

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error("❌ Get submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submission",
      error: error.message,
    });
  }
};

export default {
  createSubmission,
  getMySubmissions,
  getPendingSubmissions,
  reviewSubmission,
  markAsViewed,
  getSubmission,
};
