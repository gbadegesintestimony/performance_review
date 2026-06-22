import FormTemplate from "../models/FormTemplate.js";

const pickFormPayload = (body) => ({
  name: body.name,
  description: body.description || "",
  formFields: Array.isArray(body.formFields) ? body.formFields : [],
  placeholderMap: body.placeholderMap || {},
  helpTextMap: body.helpTextMap || {},
  fieldWidthMap: body.fieldWidthMap || {},
  validationExpanded: body.validationExpanded || {},
  requiredMap: body.requiredMap || {},
  validationRulesMap: body.validationRulesMap || {},
  ruleMenuOpen: body.ruleMenuOpen || {},
  conditionalExpanded: body.conditionalExpanded || {},
  conditionalEnabled: body.conditionalEnabled || {},
  conditionalAction: body.conditionalAction || {},
  conditionalField: body.conditionalField || {},
  conditionalCondition: body.conditionalCondition || {},
  conditionalValue: body.conditionalValue || {},
  defaultValueMap: body.defaultValueMap || {},
});

export const createFormTemplate = async (req, res) => {
  try {
    const payload = pickFormPayload(req.body);

    if (!payload.name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Form name is required",
      });
    }

    const template = await FormTemplate.create({
      ...payload,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Form template saved successfully",
      data: template,
    });
  } catch (error) {
    console.error("Create form template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save form template",
      error: error.message,
    });
  }
};

export const updateFormTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = pickFormPayload(req.body);

    const template = await FormTemplate.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      { ...payload },
      { new: true },
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Form template not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Form template updated successfully",
      data: template,
    });
  } catch (error) {
    console.error("Update form template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update form template",
      error: error.message,
    });
  }
};

export const getMyFormTemplates = async (req, res) => {
  try {
    const templates = await FormTemplate.find({ createdBy: req.user._id })
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error("Get my form templates error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch form templates",
      error: error.message,
    });
  }
};

export const getFormTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await FormTemplate.findOne({
      _id: id,
      createdBy: req.user._id,
    }).lean();

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Form template not found",
      });
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error("Get form template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch form template",
      error: error.message,
    });
  }
};

export const deleteFormTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await FormTemplate.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Form template not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Form template deleted successfully",
    });
  } catch (error) {
    console.error("Delete form template error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete form template",
      error: error.message,
    });
  }
};
