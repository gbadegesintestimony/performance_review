import Submission from "../models/submission.js";

export const createSubmissionService = async (data, userId) => {
  return await Submission.create({
    ...data,
    employee: userId,
  });
};

export const getPendingSubmissionsService = async () => {
  return await Submission.find({ status: "pending" }).populate(
    "employee",
    "name email",
  );
};
