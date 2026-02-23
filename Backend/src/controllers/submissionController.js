import {
  createSubmissionService,
  getPendingSubmissionsService,
} from "../services/submissionServices.js";

export const createSubmission = async (req, res) => {
  const submission = await createSubmissionService(req.body, req.user._id);

  res.status(201).json(submission);
};

export const getPendingSubmissions = async (req, res) => {
  const submissions = await getPendingSubmissionsService();
  res.json(submissions);
};
