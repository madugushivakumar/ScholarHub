/**
 * Filtering, searching, sorting and metric utilities for Scholarships
 */

/**
 * Calculates dynamic summary statistics
 */
export function calculateSummaryMetrics(scholarships = []) {
  const total = scholarships.length;
  let published = 0;
  let draft = 0;
  let expired = 0;

  for (const s of scholarships) {
    if (s.status === "Published") published++;
    else if (s.status === "Draft") draft++;
    else if (s.status === "Expired") expired++;
  }

  return {
    total,
    published,
    draft,
    expired
  };
}

/**
 * Filters and sorts scholarships based on active filter state
 */
export function filterAndSortScholarships(scholarships, filters) {
  const {
    search = "",
    state = "All States",
    status = "All Statuses",
    applicableClass = "All Classes",
    sortBy = "updated" // "updated", "deadline", "name-asc", "name-desc"
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  // 1. Filter pipeline
  const filtered = scholarships.filter((item) => {
    // Search match across name, state, provider, applicableClass, status
    if (normalizedSearch) {
      const matchName = item.name?.toLowerCase().includes(normalizedSearch);
      const matchState = item.state?.toLowerCase().includes(normalizedSearch);
      const matchProvider = item.provider?.toLowerCase().includes(normalizedSearch);
      const matchClass = item.applicableClass?.toLowerCase().includes(normalizedSearch);
      const matchStatus = item.status?.toLowerCase().includes(normalizedSearch);
      const matchBenefit = item.benefit?.toLowerCase().includes(normalizedSearch);

      if (!matchName && !matchState && !matchProvider && !matchClass && !matchStatus && !matchBenefit) {
        return false;
      }
    }

    // State filter
    if (state && state !== "All States" && item.state !== state) {
      return false;
    }

    // Status filter
    if (status && status !== "All Statuses" && item.status !== status) {
      return false;
    }

    // Class filter
    if (applicableClass && applicableClass !== "All Classes" && item.applicableClass !== applicableClass) {
      return false;
    }

    return true;
  });

  // 2. Sorting
  return [...filtered].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === "deadline") {
      // Put records with valid date first, ordered chronologically. "Not stated" or empty at the end.
      const hasDateA = a.deadline && a.deadline !== "Not stated";
      const hasDateB = b.deadline && b.deadline !== "Not stated";

      if (hasDateA && !hasDateB) return -1;
      if (!hasDateA && hasDateB) return 1;
      if (!hasDateA && !hasDateB) return a.name.localeCompare(b.name);

      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    // Default: "updated" - recently updated first, fallback to initial ordering
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return timeB - timeA;
  });
}
