/**
 * Form validation utilities for Scholarship records
 */

import { STATES, STATUSES, CLASSES } from "../data/scholarships.js";

export function validateUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateScholarshipForm(values) {
  const errors = {};

  // 1. Scholarship Name: required, min 3 characters
  if (!values.name || !values.name.trim()) {
    errors.name = "Scholarship name is required.";
  } else if (values.name.trim().length < 3) {
    errors.name = "Scholarship name must be at least 3 characters.";
  }

  // 2. State: required, must be Bihar / Haryana / Jharkhand
  if (!values.state || !values.state.trim()) {
    errors.state = "State is required.";
  } else if (!STATES.includes(values.state)) {
    errors.state = "State must be Bihar, Haryana, or Jharkhand.";
  }

  // 3. Provider Name: required
  if (!values.provider || !values.provider.trim()) {
    errors.provider = "Provider name is required.";
  }

  // 4. Applicable Class: required
  if (!values.applicableClass || !values.applicableClass.trim()) {
    errors.applicableClass = "Applicable class is required.";
  }

  // 5. Eligibility Criteria: required
  if (!values.eligibility || !values.eligibility.trim()) {
    errors.eligibility = "Eligibility criteria is required.";
  } else if (values.eligibility.trim().length < 10) {
    errors.eligibility = "Please provide descriptive eligibility criteria (min 10 characters).";
  }

  // 6. Scholarship Amount / Benefit: required
  if (!values.benefit || !values.benefit.trim()) {
    errors.benefit = "Scholarship amount or benefit is required.";
  }

  // 7. Application Deadline: required (date or "Not stated")
  if (!values.hasNoDeadline && (!values.deadline || !values.deadline.trim())) {
    errors.deadline = "Application deadline is required (or select 'Not stated').";
  }

  // 8. Official Application Link: required, valid URL
  if (!values.officialLink || !values.officialLink.trim()) {
    errors.officialLink = "Official application link is required.";
  } else if (!validateUrl(values.officialLink.trim())) {
    errors.officialLink = "Please enter a valid URL (starting with http:// or https://).";
  }

  // 9. Status: required, Published / Draft / Expired
  if (!values.status || !values.status.trim()) {
    errors.status = "Status is required.";
  } else if (!STATUSES.includes(values.status)) {
    errors.status = "Status must be Published, Draft, or Expired.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
