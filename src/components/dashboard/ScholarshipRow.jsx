import React from "react";
import StatusBadge from "./StatusBadge";
import { Eye, Edit3, Trash2, ChevronDown } from "lucide-react";
import { STATUSES } from "../../data/scholarships";

export default function ScholarshipRow({
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
  } = scholarship;

  return (
    <tr className="hover:bg-slate-50/80 transition-colors group border-b border-slate-100 last:border-b-0">
      {/* 1. Scholarship Name & Provider */}
      <td className="py-4 px-4 sm:px-6">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">
            {name}
          </span>
          <span className="text-xs text-slate-500 mt-0.5 font-normal">
            {provider || "State Government / Scholarship Provider"}
          </span>
        </div>
      </td>

      {/* 2. State */}
      <td className="py-4 px-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
          {state}
        </span>
      </td>

      {/* 3. Applicable Class */}
      <td className="py-4 px-4 text-xs font-medium text-slate-600">
        {applicableClass}
      </td>

      {/* 4. Application Deadline */}
      <td className="py-4 px-4 text-xs font-medium">
        <span
          className={
            deadlineDisplay === "Not stated"
              ? "text-slate-400 italic"
              : "text-slate-700"
          }
        >
          {deadlineDisplay}
        </span>
      </td>

      {/* 5. Status with Direct CRM Dropdown */}
      <td className="py-4 px-4">
        <div className="relative inline-block text-left">
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            aria-label={`Change status for ${name}`}
            className="text-xs font-semibold py-1.5 pl-3 pr-7 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer transition-colors shadow-2xs"
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
      </td>

      {/* 6. Actions: Preview, Edit, Delete */}
      <td className="py-4 px-4 sm:px-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onPreview(scholarship)}
            className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            title="Preview student-facing scholarship"
            aria-label={`Preview ${name}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onEdit(scholarship)}
            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit scholarship"
            aria-label={`Edit ${name}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(scholarship)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete scholarship"
            aria-label={`Delete ${name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
