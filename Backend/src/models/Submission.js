import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    reviewPeriod: {
      type: String,
      required: true,
    },
    department: String,

    // Employee Info
    employeeInfo: {
      name: String,
      role: String,
      department: String,
      reviewPeriod: String,
    },

    // Goals
    goals: [
      {
        description: { type: String, required: true },
        progress: { type: Number, default: 0 },
        comments: { type: String, default: "" },
      },
    ],

    // Competencies (ratings 1-5)
    competencies: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Growth Areas
    growthAreas: {
      strengths: { type: [String], default: [] },
      areasForImprovement: { type: [String], default: [] },
      developmentGoals: { type: [String], default: [] },
    },

    // Self Evaluation
    selfEvaluation: {
      accomplishments: { type: String, default: "" },
      challenges: { type: String, default: "" },
      learnings: { type: String, default: "" },
      futureGoals: { type: String, default: "" },
    },

    // Overall Rating
    overallRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },

    // Manager Feedback (added when reviewed)
    managerFeedback: {
      rating: { type: Number, min: 0, max: 5 },
      comments: String,
      feedback: String,
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reviewerName: String,
      reviewedAt: Date,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    viewedByEmployee: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Submission =
  mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
export default Submission;
