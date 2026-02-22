import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reviewPeriod: String,
    department: String,
    goals: [String],
    status: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Submission", submissionSchema);
