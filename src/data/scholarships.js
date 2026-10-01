/**
 * Authoritative Initial Sample Data for K12 Hunar Scholarship CRM
 * As specified in the assessment requirements:
 * Exactly 9 records across Bihar, Haryana, Jharkhand.
 * Initial status breakdown: 3 Published, 3 Draft, 3 Expired.
 * Demo/placeholder attributes clearly stated per assessment instructions.
 */

export const INITIAL_SCHOLARSHIPS = [
  {
    id: "scholarship-001",
    name: "Post-Matric Scholarship BC EBC",
    state: "Bihar",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 11-12",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-09-30",
    deadlineDisplay: "30 Sep 2026",
    officialLink: "https://example.com",
    status: "Published",
    createdAt: "2026-01-15T09:00:00.000Z",
    updatedAt: "2026-02-10T11:30:00.000Z"
  },
  {
    id: "scholarship-002",
    name: "Post-Matric Scholarship SC ST",
    state: "Bihar",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 11-12",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-09-30",
    deadlineDisplay: "30 Sep 2026",
    officialLink: "https://example.com",
    status: "Draft",
    createdAt: "2026-01-16T10:00:00.000Z",
    updatedAt: "2026-02-11T14:20:00.000Z"
  },
  {
    id: "scholarship-003",
    name: "Mukhyamantri Balak Balika Protsahan Yojana",
    state: "Bihar",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 9-10",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "",
    deadlineDisplay: "Not stated",
    officialLink: "https://example.com",
    status: "Expired",
    createdAt: "2026-01-17T08:30:00.000Z",
    updatedAt: "2026-02-12T09:15:00.000Z"
  },
  {
    id: "scholarship-004",
    name: "Pre-Matric Scholarship for SC Students",
    state: "Haryana",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 9-10",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-12-31",
    deadlineDisplay: "31 Dec 2026",
    officialLink: "https://example.com",
    status: "Published",
    createdAt: "2026-01-18T12:00:00.000Z",
    updatedAt: "2026-02-13T10:00:00.000Z"
  },
  {
    id: "scholarship-005",
    name: "Pre-Matric Scholarship for BC Students",
    state: "Haryana",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 9-10",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-12-31",
    deadlineDisplay: "31 Dec 2026",
    officialLink: "https://example.com",
    status: "Draft",
    createdAt: "2026-01-19T13:45:00.000Z",
    updatedAt: "2026-02-14T16:00:00.000Z"
  },
  {
    id: "scholarship-006",
    name: "Post-Matric Scholarship for SC Students",
    state: "Haryana",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 11-12",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-12-31",
    deadlineDisplay: "31 Dec 2026",
    officialLink: "https://example.com",
    status: "Expired",
    createdAt: "2026-01-20T11:15:00.000Z",
    updatedAt: "2026-02-15T12:45:00.000Z"
  },
  {
    id: "scholarship-007",
    name: "Pre-Matric Scholarship for SC Students",
    state: "Jharkhand",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 1-10",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-11-20",
    deadlineDisplay: "20 Nov 2026",
    officialLink: "https://example.com",
    status: "Published",
    createdAt: "2026-01-21T09:10:00.000Z",
    updatedAt: "2026-02-16T13:30:00.000Z"
  },
  {
    id: "scholarship-008",
    name: "Pre-Matric Scholarship for ST Students",
    state: "Jharkhand",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 1-10",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-11-20",
    deadlineDisplay: "20 Nov 2026",
    officialLink: "https://example.com",
    status: "Draft",
    createdAt: "2026-01-22T14:00:00.000Z",
    updatedAt: "2026-02-17T15:20:00.000Z"
  },
  {
    id: "scholarship-009",
    name: "Pre-Matric Scholarship for BC OBC Students",
    state: "Jharkhand",
    provider: "State Government / Scholarship Provider",
    applicableClass: "Class 1-10",
    eligibility: "Eligibility details can be configured by the employee.",
    benefit: "Scholarship benefit as specified by the provider.",
    deadline: "2026-11-20",
    deadlineDisplay: "20 Nov 2026",
    officialLink: "https://example.com",
    status: "Expired",
    createdAt: "2026-01-23T16:30:00.000Z",
    updatedAt: "2026-02-18T17:00:00.000Z"
  }
];

export const STATES = ["Bihar", "Haryana", "Jharkhand"];
export const STATUSES = ["Published", "Draft", "Expired"];
export const CLASSES = ["Class 1-10", "Class 9-10", "Class 11-12"];

export const STORAGE_KEY = "k12-hunar-scholarships";
