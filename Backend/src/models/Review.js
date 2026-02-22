import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rating: Number,
    feedback: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Review", reviewSchema);
