// Backend/src/services/submissionServices.js - FIXED VERSION
import Submission from "../models/Submission.js";

export const createSubmissionService = async (data, userId) => {
  console.log("Creating submission with data:", data);
  console.log("User ID:", userId);

  const submission = await Submission.create({
    ...data,
    employee: userId,
    status: "pending", // Ensure status is set
  });

  // Populate employee data before returning
  await submission.populate(
    "employee",
    "firstName lastName email role employeeId",
  );

  console.log("Submission created and populated:", submission);

  return submission;
};

export const getPendingSubmissionsService = async () => {
  console.log("Fetching all pending submissions");

  const submissions = await Submission.find({ status: "pending" })
    .populate("employee", "firstName lastName email role employeeId department")
    .sort({ createdAt: -1 }); // Most recent first

  console.log(`Found ${submissions.length} pending submissions`);

  // Format for frontend
  const formattedSubmissions = submissions.map((sub) => ({
    id: sub._id,
    title: `${sub.reviewPeriod} Performance Review`,
    submittedBy: sub.employee
      ? `${sub.employee.firstName} ${sub.employee.lastName}`
      : "Unknown",
    employeeEmail: sub.employee?.email || "N/A",
    employeeRole: sub.employee?.role || "N/A",
    department: sub.employee?.department || sub.department || "N/A",
    timeAgo: getTimeAgo(sub.createdAt),
    status: sub.status,
    reviewPeriod: sub.reviewPeriod,
    goals: sub.goals,
    createdAt: sub.createdAt,
    employee: {
      _id: sub.employee?._id,
      name: sub.employee
        ? `${sub.employee.firstName} ${sub.employee.lastName}`
        : "Unknown",
      email: sub.employee?.email,
      role: sub.employee?.role,
      employeeId: sub.employee?.employeeId,
    },
  }));

  return formattedSubmissions;
};

// ✅ NEW: Get submissions for specific employee
export const getMySubmissionsService = async (userId) => {
  console.log("Fetching submissions for user:", userId);

  const submissions = await Submission.find({ employee: userId })
    .populate("employee", "firstName lastName email role employeeId department")
    .sort({ createdAt: -1 }); // Most recent first

  console.log(`Found ${submissions.length} submissions for user ${userId}`);

  // Format for frontend
  const formattedSubmissions = submissions.map((sub) => ({
    id: sub._id,
    title: `${sub.reviewPeriod} Performance Review`,
    submittedBy: sub.employee
      ? `${sub.employee.firstName} ${sub.employee.lastName}`
      : "You",
    employeeEmail: sub.employee?.email,
    employeeRole: sub.employee?.role,
    department: sub.employee?.department || sub.department,
    timeAgo: getTimeAgo(sub.createdAt),
    status: sub.status,
    reviewPeriod: sub.reviewPeriod,
    goals: sub.goals,
    createdAt: sub.createdAt,
    employee: {
      _id: sub.employee?._id,
      name: sub.employee
        ? `${sub.employee.firstName} ${sub.employee.lastName}`
        : "You",
      email: sub.employee?.email,
      role: sub.employee?.role,
      employeeId: sub.employee?.employeeId,
    },
  }));

  return formattedSubmissions;
};

// ✅ NEW: Update submission status to reviewed
export const reviewSubmissionService = async (submissionId, reviewerId) => {
  console.log(
    "Reviewing submission:",
    submissionId,
    "by reviewer:",
    reviewerId,
  );

  const submission = await Submission.findByIdAndUpdate(
    submissionId,
    { status: "reviewed", reviewedBy: reviewerId, reviewedAt: new Date() },
    { new: true },
  ).populate("employee", "firstName lastName email role employeeId department");

  if (!submission) {
    throw new Error("Submission not found");
  }

  console.log("Submission reviewed successfully");

  return submission;
};

// Helper function to calculate time ago
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years ago";
  if (interval === 1) return "1 year ago";

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";
  if (interval === 1) return "1 month ago";

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days ago";
  if (interval === 1) return "1 day ago";

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " hours ago";
  if (interval === 1) return "1 hour ago";

  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " minutes ago";
  if (interval === 1) return "1 minute ago";

  return "just now";
}
