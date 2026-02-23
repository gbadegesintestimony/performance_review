import Review from "../models/Review.js";
import Submission from "../models/submission.js";

export const createReviewServices = async (
  submissionId,
  rating,
  feedback,
  managerId
) => {
  const review = await Review.create({
    submission: submissionId,
    manager: managerId,
    rating,
    feedback,
  });

  await submission.findByIdAndUpdate(submissionId, {
    status: "reviewed",
  });

  return review;
};
