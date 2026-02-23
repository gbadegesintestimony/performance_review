import { createReviewServices } from "../services/reviewServices.js";

export const createReview = async (req, res) => {
  const { submissionId, rating, feedback } = req.body;

  const review = await createReviewServices(
    submissionId,
    req.user._id,
    rating,
    feedback,
  );

  res.status(201).json(review);
};
