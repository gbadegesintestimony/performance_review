import Review from "../models/Review.js";
import Submission from "../models/submission.js";

export const createReviewServices = async (
  submissionId,
  managerId,
  rating,
  feedback,
) => {
  const review = await Review.create({
    submission: submissionId,
    manager: managerId,
    rating,
    feedback,
  });

  await Submission.findByIdAndUpdate(submissionId, {
    status: "reviewed",
  });

  return review;
};
