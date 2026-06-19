import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, default: 0 },
    type: { type: String, default: "" },
  },
  { _id: false },
);

const expenseSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expenseType: {
      type: String,
      enum: ["travel", "meals", "supplies", "mileage"],
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    project: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    expenseDate: {
      type: Date,
      required: true,
    },
    travelPurpose: { type: String, default: "" },
    fromCity: { type: String, default: "" },
    toCity: { type: String, default: "" },
    travelDays: { type: Number, default: null },
    mealType: { type: String, default: "" },
    attendees: { type: String, default: "" },
    mealBusinessPurpose: { type: String, default: "" },
    startLocation: { type: String, default: "" },
    endLocation: { type: String, default: "" },
    distanceMiles: { type: Number, default: null },
    mileageRate: { type: Number, default: 0.67 },
    mileageTotal: { type: Number, default: 0 },
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
