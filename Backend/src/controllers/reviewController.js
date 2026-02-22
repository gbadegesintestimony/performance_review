import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const { submissionId, rating, feedback } = req.body;

  const review = await Review.create({
    submission: submissionId,
    manager: req.user._id,
    rating,
    feedback,
  });

  await Submission.findByIdAndUpdate(submissionId, {
    status: "reviewed",
  });

  res.status(201).json(review);
};
