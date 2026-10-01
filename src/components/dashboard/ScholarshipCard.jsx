import React from "react";
import StatusBadge from "./StatusBadge";
import { Eye, Edit3, Trash2, Calendar, MapPin, GraduationCap, ChevronDown } from "lucide-react";
import { STATUSES } from "../../data/scholarships";

export default function ScholarshipCard({
  scholarship,
  onPreview,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const {
    id,
    name,
    provider,
    state,
    applicableClass,
    deadlineDisplay,
    status,
    benefit,
  } = scholarship;

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card transition-all space-y-3.5">
      {/* Header: Title + Provider */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-sm sm:text-base text-slate-900 leading-snug">
            {name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {provider || "State Government / Scholarship Provider"}
          </p>
        </div>
      </div>

      {/* Meta Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
          <MapPin className="w-3 h-3 text-slate-400" />
          {state}
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
          <GraduationCap className="w-3 h-3 text-slate-400" />
          {applicableClass}
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
          <Calendar className="w-3 h-3 text-slate-400" />
          {deadlineDisplay}
        </span>
      </div>

      {/* Status Selector + Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Status Dropdown */}
        <div className="relative inline-block">
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            aria-label={`Change status for ${name}`}
            className="text-xs font-semibold py-1.5 pl-3 pr-7 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer transition-colors"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPreview(scholarship)}
            className="p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            title="Preview student-facing scholarship"
            aria-label={`Preview ${name}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onEdit(scholarship)}
            className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit scholarship"
            aria-label={`Edit ${name}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(scholarship)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete scholarship"
            aria-label={`Delete ${name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
