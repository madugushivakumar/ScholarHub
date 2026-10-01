import React from "react";
import ScholarshipRow from "./ScholarshipRow";
import ScholarshipCard from "./ScholarshipCard";
import EmptyState from "../ui/EmptyState";

export default function ScholarshipTable({
  scholarships = [],
  totalCount = 0,
  onPreview,
  onEdit,
  onDelete,
  onStatusChange,
  onClearFilters,
}) {
  const currentCount = scholarships.length;

  return (
    <div className="space-y-4">
      {/* Result Information Bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
        <p>
          Showing{" "}
          <span className="font-semibold text-slate-800">{currentCount}</span> of{" "}
          <span className="font-semibold text-slate-800">{totalCount}</span> scholarships
        </p>
      </div>

      {/* Zero Results Empty State */}
      {currentCount === 0 ? (
        <EmptyState
          title="No scholarships found"
          message="No scholarship records match your current search query or filter criteria. Try adjusting your filters or search keywords."
          actionLabel="Clear Filters"
          onAction={onClearFilters}
        />
      ) : (
        <>
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th scope="col" className="py-3 px-4 sm:px-6">
                      Scholarship
                    </th>
                    <th scope="col" className="py-3 px-4">
                      State
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Applicable Class
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Deadline
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4 sm:px-6 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scholarships.map((scholarship) => (
                    <ScholarshipRow
                      key={scholarship.id}
                      scholarship={scholarship}
                      onPreview={onPreview}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile & Tablet Card View (Visible only below md breakpoint) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onPreview={onPreview}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
