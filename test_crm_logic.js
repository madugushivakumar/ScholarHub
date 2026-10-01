/**
 * Comprehensive verification script for Scholarship CRM logic
 */

import { INITIAL_SCHOLARSHIPS, STATES, STATUSES, CLASSES } from "./src/data/scholarships.js";
import { calculateSummaryMetrics, filterAndSortScholarships } from "./src/utils/scholarshipUtils.js";
import { validateScholarshipForm, validateUrl } from "./src/utils/validation.js";
import { formatDisplayDate, isValidDateOrNotStated } from "./src/utils/dateUtils.js";

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("\n==========================================");
console.log("RUNNING SCHOLARSHIP CRM LOGIC AUDIT");
console.log("==========================================\n");

// 1. Initial Sample Data Verification
console.log("--- 1. Seed Data Audit ---");
assert(INITIAL_SCHOLARSHIPS.length === 9, "Initial records count must be exactly 9");

const initialMetrics = calculateSummaryMetrics(INITIAL_SCHOLARSHIPS);
assert(initialMetrics.total === 9, "Total count is 9");
assert(initialMetrics.published === 3, "Published count is 3");
assert(initialMetrics.draft === 3, "Draft count is 3");
assert(initialMetrics.expired === 3, "Expired count is 3");

// Verify required 9 record names
const expectedNames = [
  "Post-Matric Scholarship BC EBC",
  "Post-Matric Scholarship SC ST",
  "Mukhyamantri Balak Balika Protsahan Yojana",
  "Pre-Matric Scholarship for SC Students",
  "Pre-Matric Scholarship for BC Students",
  "Post-Matric Scholarship for SC Students",
  "Pre-Matric Scholarship for SC Students",
  "Pre-Matric Scholarship for ST Students",
  "Pre-Matric Scholarship for BC OBC Students"
];

expectedNames.forEach((name) => {
  const found = INITIAL_SCHOLARSHIPS.some((s) => s.name === name);
  assert(found, `Seed dataset contains "${name}"`);
});

// 2. State Filtering
console.log("\n--- 2. State Filter Audit ---");
const biharResults = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { state: "Bihar" });
assert(biharResults.length === 3, "Bihar filter returns exactly 3 scholarships");
assert(biharResults.every((s) => s.state === "Bihar"), "All returned records belong to Bihar");

const haryanaResults = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { state: "Haryana" });
assert(haryanaResults.length === 3, "Haryana filter returns exactly 3 scholarships");
assert(haryanaResults.every((s) => s.state === "Haryana"), "All returned records belong to Haryana");

const jharkhandResults = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { state: "Jharkhand" });
assert(jharkhandResults.length === 3, "Jharkhand filter returns exactly 3 scholarships");
assert(jharkhandResults.every((s) => s.state === "Jharkhand"), "All returned records belong to Jharkhand");

// 3. Status Filtering
console.log("\n--- 3. Status Filter Audit ---");
const publishedResults = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { status: "Published" });
assert(publishedResults.length === 3, "Published filter returns 3 scholarships");

const draftResults = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { status: "Draft" });
assert(draftResults.length === 3, "Draft filter returns 3 scholarships");

const expiredResults = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { status: "Expired" });
assert(expiredResults.length === 3, "Expired filter returns 3 scholarships");

// 4. Search Filtering
console.log("\n--- 4. Search Filter Audit ---");
const searchPostMatric = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, { search: "Post-Matric" });
assert(searchPostMatric.length === 3, "Search for 'Post-Matric' returns 3 records");

const searchCombined = filterAndSortScholarships(INITIAL_SCHOLARSHIPS, {
  search: "Post-Matric",
  state: "Bihar",
  status: "Published"
});
assert(searchCombined.length === 1, "Combined search + state + status returns 1 exact matching record");
assert(searchCombined[0].name === "Post-Matric Scholarship BC EBC", "Correct record matched");

// 5. Dynamic Status Change and Recalculation
console.log("\n--- 5. Status Transition & Dynamic Counts ---");
let testScholarships = [...INITIAL_SCHOLARSHIPS];
// Change Record 2 (Draft) to Published
testScholarships = testScholarships.map((s) =>
  s.id === "scholarship-002" ? { ...s, status: "Published" } : s
);
const updatedMetrics = calculateSummaryMetrics(testScholarships);
assert(updatedMetrics.total === 9, "Total count remains 9 after status change");
assert(updatedMetrics.published === 4, "Published count dynamically incremented to 4");
assert(updatedMetrics.draft === 2, "Draft count dynamically decremented to 2");
assert(updatedMetrics.expired === 3, "Expired count unchanged at 3");

// 6. Validation Audit
console.log("\n--- 6. Form Validation Audit ---");
// Invalid submission (empty)
const emptyValidation = validateScholarshipForm({});
assert(!emptyValidation.isValid, "Empty form is invalid");
assert(!!emptyValidation.errors.name, "Name error triggered");
assert(!!emptyValidation.errors.state, "State error triggered");
assert(!!emptyValidation.errors.provider, "Provider error triggered");
assert(!!emptyValidation.errors.applicableClass, "Class error triggered");
assert(!!emptyValidation.errors.eligibility, "Eligibility error triggered");
assert(!!emptyValidation.errors.benefit, "Benefit error triggered");
assert(!!emptyValidation.errors.officialLink, "Official link error triggered");
assert(!!emptyValidation.errors.status, "Status error triggered");

// Short name
const shortNameValidation = validateScholarshipForm({
  name: "AB",
  state: "Bihar",
  provider: "Provider",
  applicableClass: "Class 11-12",
  eligibility: "Eligibility details must be longer than ten chars",
  benefit: "₹10,000",
  hasNoDeadline: true,
  officialLink: "https://example.com",
  status: "Published"
});
assert(!shortNameValidation.isValid, "Short name is invalid");
assert(shortNameValidation.errors.name.includes("at least 3 characters"), "Name length message verified");

// Invalid URL
const badUrlValidation = validateScholarshipForm({
  name: "Valid Scholarship Name",
  state: "Bihar",
  provider: "Provider",
  applicableClass: "Class 11-12",
  eligibility: "Eligibility details must be longer than ten chars",
  benefit: "₹10,000",
  hasNoDeadline: true,
  officialLink: "not-a-valid-url",
  status: "Published"
});
assert(!badUrlValidation.isValid, "Bad URL is rejected");
assert(badUrlValidation.errors.officialLink.includes("valid URL"), "URL error message verified");

// Valid submission
const validSubmission = validateScholarshipForm({
  name: "New Merit Scholarship",
  state: "Haryana",
  provider: "Haryana Board of School Education",
  applicableClass: "Class 9-10",
  eligibility: "Students scoring over 85% in Grade 8 examination.",
  benefit: "₹12,000 annual scholarship allowance",
  deadline: "2026-10-31",
  officialLink: "https://haryana.gov.in/scholarship",
  status: "Published"
});
assert(validSubmission.isValid, "Valid form passes all checks with zero errors");

// 7. Date Handling
console.log("\n--- 7. Date Handling Audit ---");
assert(formatDisplayDate("2026-09-30") === "30 Sep 2026", "Formatted 2026-09-30 to '30 Sep 2026'");
assert(formatDisplayDate("2026-12-31") === "31 Dec 2026", "Formatted 2026-12-31 to '31 Dec 2026'");
assert(formatDisplayDate("Not stated") === "Not stated", "Handled 'Not stated' correctly");
assert(formatDisplayDate("") === "Not stated", "Handled empty date as 'Not stated'");

console.log("\n==========================================");
console.log("ALL LOGIC AUDITS PASSED SUCCESSFULLY (100%)");
console.log("==========================================\n");
