import Expense from "../models/Expense.js";

const toNumberOrNull = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const createExpense = async (req, res) => {
  try {
    const {
      expenseType,
      amount,
      project,
      description,
      expenseDate,
      travelPurpose,
      fromCity,
      toCity,
      travelDays,
      mealType,
      attendees,
      mealBusinessPurpose,
      startLocation,
      endLocation,
      distanceMiles,
      mileageRate,
      mileageTotal,
      attachments,
    } = req.body;

    if (!expenseType) {
      return res.status(400).json({
        success: false,
        message: "Expense type is required",
      });
    }

    const normalizedDate = expenseDate ? new Date(expenseDate) : new Date();
    if (Number.isNaN(normalizedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Expense date is invalid",
      });
    }

    const normalizedAttachments = Array.isArray(attachments)
      ? attachments.map((file) => ({
          name: file.name || "Attachment",
          size: Number(file.size) || 0,
          type: file.type || "",
        }))
      : [];

    const normalizedMileageRate = toNumberOrNull(mileageRate) ?? 0.67;
    const normalizedMileageTotal =
      toNumberOrNull(mileageTotal) ??
      (toNumberOrNull(distanceMiles) || 0) * normalizedMileageRate;

    const expense = await Expense.create({
      submittedBy: req.user._id,
      expenseType,
      amount: toNumberOrNull(amount) ?? normalizedMileageTotal,
      project: project || "",
      description: description || "",
      expenseDate: normalizedDate,
      travelPurpose: travelPurpose || "",
      fromCity: fromCity || "",
      toCity: toCity || "",
      travelDays: toNumberOrNull(travelDays),
      mealType: mealType || "",
      attendees: attendees || "",
      mealBusinessPurpose: mealBusinessPurpose || "",
      startLocation: startLocation || "",
      endLocation: endLocation || "",
      distanceMiles: toNumberOrNull(distanceMiles),
      mileageRate: normalizedMileageRate,
      mileageTotal: normalizedMileageTotal,
      attachments: normalizedAttachments,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Create expense error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create expense",
      error: error.message,
    });
  }
};

export const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ submittedBy: req.user._id })
      .populate("submittedBy", "firstName lastName email role department employeeId")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error("Get my expenses error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};

export default {
  createExpense,
  getMyExpenses,
};
