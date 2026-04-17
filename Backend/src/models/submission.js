// Backend/src/models/submission.js - COMPLETE MODEL
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    goals: [String],

    // Competencies (ratings 1-5)
    competencies: {
      technicalSkills: Number,
      problemSolving: Number,
      communication: Number,
      teamwork: Number,
      leadership: Number,
      timeManagement: Number,
    },

    // Growth Areas
    growthAreas: {
      strengths: [String],
      areasForImprovement: [String],
      developmentGoals: [String],
    },

    // Self Evaluation
    selfEvaluation: {
      accomplishments: String,
      challenges: String,
      learnings: String,
      futureGoals: String,
    },

    // Overall Rating
    overallRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },

    // Manager Feedback (added when reviewed)
    managerFeedback: {
      rating: Number,
      comments: String,
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reviewedAt: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Submission", submissionSchema);
