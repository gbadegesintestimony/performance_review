import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, default: "" },
    type: { type: String, required: true },
    typeLabel: { type: String, default: "" },
  },
  { _id: false },
);

const formTemplateSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    formFields: {
      type: [fieldSchema],
      default: [],
    },
    placeholderMap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    helpTextMap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    fieldWidthMap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    validationExpanded: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    requiredMap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    validationRulesMap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ruleMenuOpen: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    conditionalExpanded: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    conditionalEnabled: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    conditionalAction: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    conditionalField: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    conditionalCondition: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    conditionalValue: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    defaultValueMap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const FormTemplate =
  mongoose.models.FormTemplate ||
  mongoose.model("FormTemplate", formTemplateSchema);

export default FormTemplate;
