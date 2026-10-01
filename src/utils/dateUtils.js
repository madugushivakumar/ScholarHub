/**
 * Safe date utilities for Scholarship CRM
 */

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Formats a YYYY-MM-DD string into "DD Mon YYYY" (e.g., "30 Sep 2026")
 * If empty or "Not stated", returns "Not stated"
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr || dateStr === "Not stated") {
    return "Not stated";
  }

  // Handle standard YYYY-MM-DD
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 0 && month < 12) {
      return `${String(day).padStart(2, "0")} ${MONTH_NAMES[month]} ${year}`;
    }
  }

  // Fallback to JS Date parser if valid
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = MONTH_NAMES[parsed.getMonth()];
    const year = parsed.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return dateStr;
}

/**
 * Checks if a string is a valid ISO date or "Not stated"
 */
export function isValidDateOrNotStated(dateStr) {
  if (!dateStr) return false;
  if (dateStr.trim().toLowerCase() === "not stated") return true;

  // Simple YYYY-MM-DD regex
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (regex.test(dateStr)) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }

  return false;
}
