import React, { createContext, useContext, useMemo, useCallback } from "react";
import { INITIAL_SCHOLARSHIPS, STORAGE_KEY } from "../data/scholarships";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { calculateSummaryMetrics } from "../utils/scholarshipUtils";
import { formatDisplayDate } from "../utils/dateUtils";
import { useToast } from "./ToastContext";

const ScholarshipContext = createContext(null);

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useLocalStorage(STORAGE_KEY, INITIAL_SCHOLARSHIPS);
  const { addToast } = useToast();

  // Dynamic summary metrics calculated strictly from current state
  const metrics = useMemo(() => {
    return calculateSummaryMetrics(scholarships);
  }, [scholarships]);

  // Lookup helper
  const getScholarshipById = useCallback((id) => {
    return scholarships.find((item) => String(item.id) === String(id)) || null;
  }, [scholarships]);

  // Add Scholarship
  const addScholarship = useCallback((data) => {
    const now = new Date().toISOString();
    const newId = `scholarship-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;

    const deadlineDisplay = data.hasNoDeadline || !data.deadline || data.deadline === "Not stated"
      ? "Not stated"
      : formatDisplayDate(data.deadline);

    const newRecord = {
      ...data,
      id: newId,
      deadline: data.hasNoDeadline ? "" : data.deadline,
      deadlineDisplay,
      createdAt: now,
      updatedAt: now
    };

    setScholarships((prev) => [newRecord, ...prev]);
    addToast(`"${newRecord.name}" added successfully.`, "success");
    return newRecord;
  }, [setScholarships, addToast]);

  // Update Scholarship
  const updateScholarship = useCallback((id, updatedData) => {
    const now = new Date().toISOString();

    const deadlineDisplay = updatedData.hasNoDeadline || !updatedData.deadline || updatedData.deadline === "Not stated"
      ? "Not stated"
      : formatDisplayDate(updatedData.deadline);

    let updatedRecord = null;

    setScholarships((prev) => {
      return prev.map((item) => {
        if (String(item.id) === String(id)) {
          updatedRecord = {
            ...item,
            ...updatedData,
            deadline: updatedData.hasNoDeadline ? "" : updatedData.deadline,
            deadlineDisplay,
            updatedAt: now
          };
          return updatedRecord;
        }
        return item;
      });
    });

    if (updatedRecord) {
      addToast(`Scholarship "${updatedRecord.name}" updated successfully.`, "success");
    }
    return updatedRecord;
  }, [setScholarships, addToast]);

  // Update Status directly (from table or card inline selector)
  const updateStatus = useCallback((id, newStatus) => {
    let targetName = "";
    setScholarships((prev) => {
      return prev.map((item) => {
        if (String(item.id) === String(id)) {
          targetName = item.name;
          return {
            ...item,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      });
    });

    addToast(`Status updated to "${newStatus}" for ${targetName || "scholarship"}.`, "info");
  }, [setScholarships, addToast]);

  // Safe Delete (requires confirmation in UI)
  const deleteScholarship = useCallback((id) => {
    let deletedName = "";
    setScholarships((prev) => {
      const target = prev.find((item) => String(item.id) === String(id));
      if (target) deletedName = target.name;
      return prev.filter((item) => String(item.id) !== String(id));
    });

    addToast(`Scholarship "${deletedName || id}" deleted successfully.`, "info");
  }, [setScholarships, addToast]);

  // Reset demo data to initial 9 assessment records
  const resetScholarships = useCallback(() => {
    setScholarships(INITIAL_SCHOLARSHIPS);
    addToast("Restored initial 9 assessment scholarship records.", "info");
  }, [setScholarships, addToast]);

  const value = useMemo(() => ({
    scholarships,
    metrics,
    getScholarshipById,
    addScholarship,
    updateScholarship,
    updateStatus,
    deleteScholarship,
    resetScholarships
  }), [
    scholarships,
    metrics,
    getScholarshipById,
    addScholarship,
    updateScholarship,
    updateStatus,
    deleteScholarship,
    resetScholarships
  ]);

  return (
    <ScholarshipContext.Provider value={value}>
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarships() {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error("useScholarships must be used within a ScholarshipProvider");
  }
  return context;
}
