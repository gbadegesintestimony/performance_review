import { useRef, useState } from "react";
import {
  Eye,
  Save,
  Plus,
  EyeOff,
  Wifi,
  Calendar,
  Text,
  AlignLeft,
  ChevronDown,
  CheckSquare,
  Upload,
  Mail,
  Hash,
  Settings2,
  Trash2,
  ChevronUp,
  GripVertical,
  CircleCheck,
} from "lucide-react";
import "../styles/Builder.css";

function Builder() {
  const [isPreview, setIsPreview] = useState(false);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [expandedFieldId, setExpandedFieldId] = useState(null);
  const [placeholderMap, setPlaceholderMap] = useState({});
  const [helpTextMap, setHelpTextMap] = useState({});
  const [fieldWidthMap, setFieldWidthMap] = useState({});
  const [validationExpanded, setValidationExpanded] = useState({});
  const [requiredMap, setRequiredMap] = useState({});
  const [validationRulesMap, setValidationRulesMap] = useState({});
  const [ruleMenuOpen, setRuleMenuOpen] = useState({});
  const [conditionalExpanded, setConditionalExpanded] = useState({});
  const [conditionalEnabled, setConditionalEnabled] = useState({});
  const [conditionalAction, setConditionalAction] = useState({});
  const [conditionalField, setConditionalField] = useState({});
  const [conditionalCondition, setConditionalCondition] = useState({});
  const [conditionalValue, setConditionalValue] = useState({});
  const [defaultValueMap, setDefaultValueMap] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const toastTimeoutRef = useRef(null);

  const FIELD_TYPES = [
    { id: "text", title: "Text", description: "Single line text input", icon: Text },
    { id: "textarea", title: "Text Area", description: "Multi-line text", icon: AlignLeft },
    { id: "dropdown", title: "Dropdown", description: "Select from options", icon: ChevronDown },
    { id: "checkbox", title: "Checkbox", description: "Yes/No choice", icon: CheckSquare },
    { id: "file", title: "File Upload", description: "Upload Documents", icon: Upload },
    { id: "date", title: "Date Picker", description: "Select a date", icon: Calendar },
    { id: "number", title: "Number", description: "Numeric input", icon: Hash },
    { id: "email", title: "Email", description: "Email address", icon: Mail },
  ];

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
      toastTimeoutRef.current = null;
    }, 2200);
  };

  const handleFieldTypeSelect = (field) => {
    setFormFields((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), label: "", type: field.id, typeLabel: field.title },
    ]);
    setShowFieldSelector(false);
    triggerToast(`${field.title} field added`);
  };

  const handleFieldLabelChange = (id, value) => {
    setFormFields((prev) => prev.map((field) => (field.id === id ? { ...field, label: value } : field)));
  };

  const handleDeleteField = (id) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
    setExpandedFieldId((prev) => (prev === id ? null : prev));
    const clean = (setter) =>
      setter((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    [setValidationExpanded, setRequiredMap, setRuleMenuOpen, setValidationRulesMap, setConditionalExpanded, setConditionalEnabled, setConditionalAction, setConditionalField, setConditionalCondition, setConditionalValue, setDefaultValueMap, setPlaceholderMap, setHelpTextMap, setFieldWidthMap].forEach(clean);
    triggerToast("Field removed");
  };

  const handleClearAll = () => {
    setFormFields([]);
    setExpandedFieldId(null);
    setShowFieldSelector(false);
    setValidationExpanded({});
    setRequiredMap({});
    setValidationRulesMap({});
    setRuleMenuOpen({});
    setConditionalExpanded({});
    setConditionalEnabled({});
    setConditionalAction({});
    setConditionalField({});
    setConditionalCondition({});
    setConditionalValue({});
    setDefaultValueMap({});
    setPlaceholderMap({});
    setHelpTextMap({});
    setFieldWidthMap({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    triggerToast("Form saved (frontend-only mode)");
  };

  const totalFields = formFields.length;
  const requiredCount = formFields.filter((field) => requiredMap[field.id]).length;
  const conditionalCount = formFields.filter((field) => conditionalEnabled[field.id]).length;
  const prePopulatedCount = formFields.filter((field) => (defaultValueMap[field.id] || "").trim() !== "").length;
  const validationRuleOptions = ["Min Length", "Max Length", "Pattern (Regex)"];

  const toggleValidationRule = (fieldId, ruleLabel) => {
    setValidationRulesMap((prev) => {
      const currentRules = prev[fieldId] || [];
      const hasRule = currentRules.includes(ruleLabel);
      return { ...prev, [fieldId]: hasRule ? currentRules.filter((rule) => rule !== ruleLabel) : [...currentRules, ruleLabel] };
    });
  };

  return (
    <div className="builder-page-bg">
      <div className="builder-card">
        <div className="builder-header">
          <h1>{isPreview ? "Form Preview" : "Form Builder"}</h1>
          <div className="builder-actions">
            {!isPreview ? (
              <>
                <button className="preview-btn" onClick={() => setIsPreview(true)}>
                  <Eye className="icon-inline" size={16} /> Preview
                </button>
                <button className="save-btn" onClick={handleSave}>
                  <Save className="icon-inline" size={16} /> {isSaving ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button className="preview-btn" onClick={() => setIsPreview(false)}>
                <EyeOff className="icon-inline" size={16} /> Exit Preview
              </button>
            )}
          </div>
        </div>

        {isPreview ? (
          <>
            <div className="thin-separator"></div>
            <div className="preview-header">
              <div>
                <h1 className="preview-title">{formName.trim() || "Untitled Form"}</h1>
                <p className="preview-desc">{formDescription.trim() || "Brief Description"}</p>
              </div>
              <button className="status-btn">
                <Wifi className="icon-inline" size={14} /> Online
              </button>
            </div>
            <button className="submit-preview-btn">Submit (Preview)</button>
          </>
        ) : (
          <>
            <div className="form-meta">
              <div className="form-name">
                <label>Form Name</label>
                <input type="text" placeholder="Enter form name" value={formName} onChange={(e) => setFormName(e.target.value)} />
              </div>
              <div className="form-desc">
                <label>Form Description</label>
                <input type="text" placeholder="Brief Description" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} />
              </div>
            </div>

            <div className="thin-separator"></div>

            <div className="fields-section">
              <div className="fields-header">
                <span>Fields ({formFields.length})</span>
                {totalFields > 0 && (
                  <button type="button" className="clear-all-btn" onClick={handleClearAll}>
                    <Trash2 size={14} />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {formFields.length === 0 ? (
                <div className="drag-drop">
                  <p className="field-p">No fields added yet</p>
                  <button className="field-card" onClick={() => setShowFieldSelector(true)}>
                    <Plus className="icon-inline" size={14} /> Add your first field
                  </button>
                </div>
              ) : (
                <>
                  {formFields.map((field) => (
                    <div key={field.id} className="added-field-card">
                      <div className="added-field-header">
                        <div className="added-field-left">
                          <h4 className="added-field-title">
                            <GripVertical size={14} />
                            {field.label.trim() || "Untitled Field"}
                          </h4>
                          <p>{field.typeLabel}</p>
                        </div>
                        <div className="added-field-actions">
                          <button type="button" className="field-action-btn" onClick={() => setExpandedFieldId((prev) => (prev === field.id ? null : field.id))}>
                            {expandedFieldId === field.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          <button type="button" className="field-action-btn delete" onClick={() => handleDeleteField(field.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {expandedFieldId === field.id && (
                        <div className="added-field-body">
                          <div className="added-field-divider" />
                          <div className="field-input-grid">
                            <div>
                              <label>Label</label>
                              <input type="text" placeholder="Field label" className="field-input" value={field.label} onChange={(e) => handleFieldLabelChange(field.id, e.target.value)} />
                            </div>
                            <div>
                              <label>Placeholder</label>
                              <input type="text" placeholder="Placeholder text" className="field-input" value={placeholderMap[field.id] || ""} onChange={(e) => setPlaceholderMap((prev) => ({ ...prev, [field.id]: e.target.value }))} />
                            </div>
                          </div>
                          <div className="field-input-stack">
                            <label>Help Text</label>
                            <input type="text" placeholder="Additional instructions for users" className="field-input" value={helpTextMap[field.id] || ""} onChange={(e) => setHelpTextMap((prev) => ({ ...prev, [field.id]: e.target.value }))} />
                          </div>
                          <div className="field-input-stack">
                            <label>Default Value (Pre-populated)</label>
                            <input type="text" placeholder="Default value" className="field-input" value={defaultValueMap[field.id] || ""} onChange={(e) => setDefaultValueMap((prev) => ({ ...prev, [field.id]: e.target.value }))} />
                          </div>
                          <div className="field-input-stack">
                            <label>Field Width</label>
                            <select className="field-input field-select" value={fieldWidthMap[field.id] || "Full Width"} onChange={(e) => setFieldWidthMap((prev) => ({ ...prev, [field.id]: e.target.value }))}>
                              <option>Full Width</option>
                              <option>Half Width</option>
                            </select>
                          </div>

                          <div className="validation-header">
                            <span className="section-header-label">
                              <Settings2 size={14} />
                              Validation Rules ({(requiredMap[field.id] ? 1 : 0) + (validationRulesMap[field.id]?.length || 0)})
                            </span>
                            <button type="button" className="field-action-btn" onClick={() => setValidationExpanded((prev) => ({ ...prev, [field.id]: !prev[field.id] }))}>
                              <ChevronDown size={14} />
                            </button>
                          </div>

                          {validationExpanded[field.id] && (
                            <div className="validation-body">
                              <div className="validation-row">
                                <span>Required Field</span>
                                <label className="switch">
                                  <input type="checkbox" checked={!!requiredMap[field.id]} onChange={(e) => setRequiredMap((prev) => ({ ...prev, [field.id]: e.target.checked }))} />
                                  <span className="slider" />
                                </label>
                              </div>
                              <div className="validation-add">
                                <span>Add Validation rule...</span>
                                <button type="button" className="field-action-btn" onClick={() => setRuleMenuOpen((prev) => ({ ...prev, [field.id]: !prev[field.id] }))}>
                                  <ChevronDown size={14} />
                                </button>
                              </div>
                              {ruleMenuOpen[field.id] && (
                                <div className="validation-menu">
                                  {validationRuleOptions.map((ruleLabel) => (
                                    <button key={ruleLabel} type="button" className={["validation-option", (validationRulesMap[field.id] || []).includes(ruleLabel) && "selected"].filter(Boolean).join(" ")} onClick={() => toggleValidationRule(field.id, ruleLabel)}>
                                      {ruleLabel}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  <button type="button" className="add-field-trigger" onClick={() => setShowFieldSelector(true)}>
                    Add Field
                  </button>

                  <div className="builder-summary-card">
                    <span><span className="summary-value">{totalFields}</span> fields</span>
                    <span className="summary-dot">•</span>
                    <span><span className="summary-value">{requiredCount}</span> required</span>
                    <span className="summary-dot">•</span>
                    <span><span className="summary-value">{conditionalCount}</span> with conditional logic</span>
                    <span className="summary-dot">•</span>
                    <span><span className="summary-value">{prePopulatedCount}</span> pre-populated</span>
                  </div>
                </>
              )}

              {showFieldSelector && (
                <div className="field-selector-card">
                  <div className="field-selector-header">
                    <h3>Select Field Type</h3>
                    <button className="cancel-btn" onClick={() => setShowFieldSelector(false)}>Cancel</button>
                  </div>
                  <div className="field-options-grid">
                    {FIELD_TYPES.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.id} className="field-option" onClick={() => handleFieldTypeSelect(field)}>
                          <Icon className="field-option-icon" size={22} />
                          <h3>{field.title}</h3>
                          <p>{field.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {totalFields > 0 && (
        <p className="builder-help-line">
          Drag fields to reorder <span className="summary-dot">•</span> Click to expand and edit settings
        </p>
      )}

      {showToast && (
        <div className="save-toast">
          <CircleCheck size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Builder;
