import React, { useState, useMemo } from "react";
import { useScholarships } from "../context/ScholarshipContext";
import { filterAndSortScholarships } from "../utils/scholarshipUtils";
import SummaryCard from "../components/dashboard/SummaryCard";
import ScholarshipFilters from "../components/dashboard/ScholarshipFilters";
import ScholarshipTable from "../components/dashboard/ScholarshipTable";
import Modal from "../components/ui/Modal";
import ScholarshipForm from "../components/scholarship/ScholarshipForm";
import ScholarshipPreview from "../components/scholarship/ScholarshipPreview";
import DeleteConfirmModal from "../components/scholarship/DeleteConfirmModal";
import ResetConfirmModal from "../components/scholarship/ResetConfirmModal";

export default function Dashboard() {
  const {
    scholarships,
    metrics,
    addScholarship,
    updateScholarship,
    updateStatus,
    deleteScholarship,
    resetScholarships,
  } = useScholarships();

  // Filter & Search State
  const [filters, setFilters] = useState({
    search: "",
    state: "All States",
    status: "All Statuses",
    applicableClass: "All Classes",
    sortBy: "updated",
  });

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [previewScholarship, setPreviewScholarship] = useState(null);
  const [deletingScholarship, setDeletingScholarship] = useState(null);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setFilters({
      search: "",
      state: "All States",
      status: "All Statuses",
      applicableClass: "All Classes",
      sortBy: "updated",
    });
  };

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search.trim() !== "" ||
      filters.state !== "All States" ||
      filters.status !== "All Statuses" ||
      filters.applicableClass !== "All Classes" ||
      filters.sortBy !== "updated"
    );
  }, [filters]);

  // Derived filtered & sorted scholarships
  const filteredScholarships = useMemo(() => {
    return filterAndSortScholarships(scholarships, filters);
  }, [scholarships, filters]);

  // Handler for SummaryCard click (quick filter toggle)
  const handleCardClick = (cardStatus) => {
    if (filters.status === cardStatus) {
      handleFilterChange("status", "All Statuses");
    } else {
      handleFilterChange("status", cardStatus);
    }
  };

  // Save Add
  const handleAddSubmit = (formData) => {
    addScholarship(formData);
    setIsAddOpen(false);
  };

  // Save Edit
  const handleEditSubmit = (formData) => {
    if (editingScholarship) {
      updateScholarship(editingScholarship.id, formData);
      setEditingScholarship(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Summary Cards (4 Dynamic Cards) */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Scholarship Overview Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            type="total"
            count={metrics.total}
            isActive={false}
          />
          <SummaryCard
            type="published"
            count={metrics.published}
            isActive={filters.status === "Published"}
            onClick={() => handleCardClick("Published")}
          />
          <SummaryCard
            type="draft"
            count={metrics.draft}
            isActive={filters.status === "Draft"}
            onClick={() => handleCardClick("Draft")}
          />
          <SummaryCard
            type="expired"
            count={metrics.expired}
            isActive={filters.status === "Expired"}
            onClick={() => handleCardClick("Expired")}
          />
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section aria-labelledby="filters-heading">
        <h2 id="filters-heading" className="sr-only">
          Search and Filter Scholarships
        </h2>
        <ScholarshipFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onOpenAddModal={() => setIsAddOpen(true)}
          onOpenResetConfirm={() => setIsResetOpen(true)}
          hasActiveFilters={hasActiveFilters}
        />
      </section>

      {/* 3. Scholarships Table & Mobile List */}
      <section aria-labelledby="records-heading">
        <h2 id="records-heading" className="sr-only">
          Scholarship Records
        </h2>
        <ScholarshipTable
          scholarships={filteredScholarships}
          totalCount={metrics.total}
          onPreview={(s) => setPreviewScholarship(s)}
          onEdit={(s) => setEditingScholarship(s)}
          onDelete={(s) => setDeletingScholarship(s)}
          onStatusChange={updateStatus}
          onClearFilters={handleResetFilters}
        />
      </section>

      {/* --- MODALS --- */}

      {/* Add Scholarship Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Scholarship"
        description="Enter the scholarship opportunity details to add to your CRM records."
        maxWidth="max-w-2xl"
      >
        <ScholarshipForm
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddOpen(false)}
          isEdit={false}
        />
      </Modal>

      {/* Edit Scholarship Modal */}
      <Modal
        isOpen={!!editingScholarship}
        onClose={() => setEditingScholarship(null)}
        title="Edit Scholarship"
        description="Modify scholarship details. Status changes will immediately reflect across your CRM."
        maxWidth="max-w-2xl"
      >
        {editingScholarship && (
          <ScholarshipForm
            initialData={editingScholarship}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingScholarship(null)}
            isEdit={true}
          />
        )}
      </Modal>

      {/* Student-Facing Preview Modal */}
      <Modal
        isOpen={!!previewScholarship}
        onClose={() => setPreviewScholarship(null)}
        title="Scholarship Preview"
        description="Live preview of how this opportunity is displayed to students on K12 Hunar."
        maxWidth="max-w-3xl"
      >
        {previewScholarship && (
          <ScholarshipPreview
            scholarship={previewScholarship}
            onClose={() => setPreviewScholarship(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingScholarship}
        scholarship={deletingScholarship}
        onClose={() => setDeletingScholarship(null)}
        onConfirm={deleteScholarship}
      />

      {/* Reset Demo Data Modal */}
      <ResetConfirmModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={resetScholarships}
      />
    </div>
  );
}
