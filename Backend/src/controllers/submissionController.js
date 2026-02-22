import Submission from "../models/submission.js";

export const createSubmission = async (req, res) => {
  const submission = await Submission.create({
    ...req.body,
    employee: req.user._id,
  });

  res.status(201).json(submission);
};

export const getPendingSubmissions = async (req, res) => {
  const submissions = await Submission.find({ status: "pending" }).populate(
    "employee",
    "name email",
  );

  res.json(submissions);
};
