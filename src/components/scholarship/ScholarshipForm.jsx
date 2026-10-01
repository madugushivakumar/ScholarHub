import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { STATES, STATUSES, CLASSES } from "../../data/scholarships";
import { validateScholarshipForm } from "../../utils/validation";

export default function ScholarshipForm({
  initialData = null,
  onSubmit,
  onCancel,
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    state: "Bihar",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 11-12",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-12-31",
    hasNoDeadline: false,
    officialLink: "https://example.com",
    status: "Draft",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        state: initialData.state || "Bihar",
        provider: initialData.provider || "State Government / Scholarship Provider",
        applicableClass: initialData.applicableClass || "Class 11-12",
        eligibility: initialData.eligibility || "",
        benefit: initialData.benefit || "",
        deadline: initialData.deadline || "",
        hasNoDeadline: !initialData.deadline || initialData.deadline === "Not stated",
        officialLink: initialData.officialLink || "https://example.com",
        status: initialData.status || "Draft",
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field once user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const { errors: validationErrors } = validateScholarshipForm(formData);
    if (validationErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    }
  };

  const handleDeadlineToggle = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      hasNoDeadline: checked,
      deadline: checked ? "" : prev.deadline || "2026-12-31",
    }));
    if (checked && errors.deadline) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.deadline;
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: validationErrors, isValid } = validateScholarshipForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      // Mark all fields touched
      const allTouched = Object.keys(formData).reduce((acc, k) => {
        acc[k] = true;
        return acc;
      }, {});
      setTouched(allTouched);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Basic Information Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
          Scholarship Information
        </h4>

        {/* Scholarship Name */}
        <Input
          label="Scholarship Name"
          name="name"
          placeholder="e.g. Post-Matric Scholarship BC EBC"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={errors.name}
          required
        />

        {/* State & Provider Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="State"
            name="state"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            onBlur={() => handleBlur("state")}
            options={STATES}
            error={errors.state}
            required
          />

          <Input
            label="Provider Name"
            name="provider"
            placeholder="e.g. State Government / Scholarship Provider"
            value={formData.provider}
            onChange={(e) => handleChange("provider", e.target.value)}
            onBlur={() => handleBlur("provider")}
            error={errors.provider}
            required
          />
        </div>

        {/* Applicable Class & Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Applicable Class"
            name="applicableClass"
            value={formData.applicableClass}
            onChange={(e) => handleChange("applicableClass", e.target.value)}
            onBlur={() => handleBlur("applicableClass")}
            options={CLASSES}
            error={errors.applicableClass}
            required
          />

          <Select
            label="Publication Status"
            name="status"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            onBlur={() => handleBlur("status")}
            options={STATUSES}
            error={errors.status}
            required
          />
        </div>
      </div>

      {/* 2. Benefits & Eligibility Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
          Eligibility & Benefits
        </h4>

        <Input
          label="Scholarship Amount / Benefit"
          name="benefit"
          placeholder="e.g. Scholarship benefit as specified by the provider."
          value={formData.benefit}
          onChange={(e) => handleChange("benefit", e.target.value)}
          onBlur={() => handleBlur("benefit")}
          error={errors.benefit}
          required
        />

        <Textarea
          label="Eligibility Criteria"
          name="eligibility"
          rows={3}
          placeholder="Describe applicant criteria, caste category, income threshold, etc."
          value={formData.eligibility}
          onChange={(e) => handleChange("eligibility", e.target.value)}
          onBlur={() => handleBlur("eligibility")}
          error={errors.eligibility}
          required
        />
      </div>

      {/* 3. Deadlines & Links Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
          Application Details
        </h4>

        <div className="space-y-2">
          <Input
            label="Application Deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
            onBlur={() => handleBlur("deadline")}
            disabled={formData.hasNoDeadline}
            error={errors.deadline}
            required={!formData.hasNoDeadline}
          />

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.hasNoDeadline}
              onChange={handleDeadlineToggle}
              className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-xs text-slate-600 font-medium">
              No specific deadline / "Not stated"
            </span>
          </label>
        </div>

        <Input
          label="Official Application Link"
          name="officialLink"
          type="url"
          placeholder="https://example.com"
          value={formData.officialLink}
          onChange={(e) => handleChange("officialLink", e.target.value)}
          onBlur={() => handleBlur("officialLink")}
          error={errors.officialLink}
          helperText="External official government portal or scholarship URL"
          required
        />
      </div>

      {/* Form Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? "Save Changes" : "Save Scholarship"}
        </Button>
      </div>
    </form>
  );
}
