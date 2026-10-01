import React from "react";
import { STATES, STATUSES, CLASSES } from "../../data/scholarships";
import SearchBar from "./SearchBar";
import Button from "../ui/Button";
import { Plus, RotateCcw, Filter, RefreshCw } from "lucide-react";

export default function ScholarshipFilters({
  filters,
  onFilterChange,
  onResetFilters,
  onOpenAddModal,
  onOpenResetConfirm,
  hasActiveFilters,
}) {
  const handleStateChange = (e) => {
    onFilterChange("state", e.target.value);
  };

  const handleStatusChange = (e) => {
    onFilterChange("status", e.target.value);
  };

  const handleClassChange = (e) => {
    onFilterChange("applicableClass", e.target.value);
  };

  const handleSortChange = (e) => {
    onFilterChange("sortBy", e.target.value);
  };

  const handleSearchChange = (val) => {
    onFilterChange("search", val);
  };

  const handleSearchClear = () => {
    onFilterChange("search", "");
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
      {/* Top Bar: Search + Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={filters.search}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={onResetFilters}
              title="Clear all active filters"
            >
              Clear Filters
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={onOpenResetConfirm}
            title="Reset data to original 9 assessment records"
            className="text-slate-600 hover:text-slate-800"
          >
            Reset Demo Data
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={onOpenAddModal}
            className="whitespace-nowrap"
          >
            Add Scholarship
          </Button>
        </div>
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        {/* State Filter (Assessment core requirement) */}
        <div>
          <label htmlFor="state-filter" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            State
          </label>
          <select
            id="state-filter"
            value={filters.state}
            onChange={handleStateChange}
            className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
          >
            <option value="All States">All States</option>
            {STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Applicable Class Filter */}
        <div>
          <label htmlFor="class-filter" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Class
          </label>
          <select
            id="class-filter"
            value={filters.applicableClass}
            onChange={handleClassChange}
            className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
          >
            <option value="All Classes">All Classes</option>
            {CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label htmlFor="sort-filter" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Sort By
          </label>
          <select
            id="sort-filter"
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full text-xs font-medium py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
          >
            <option value="updated">Recently Updated</option>
            <option value="deadline">Application Deadline</option>
            <option value="name-asc">Scholarship Name (A–Z)</option>
            <option value="name-desc">Scholarship Name (Z–A)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
