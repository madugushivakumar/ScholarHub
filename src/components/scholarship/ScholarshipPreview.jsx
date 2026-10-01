import React from "react";
import StatusBadge from "../dashboard/StatusBadge";
import {
  ExternalLink,
  Calendar,
  GraduationCap,
  MapPin,
  Gift,
  Building2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Button from "../ui/Button";

export default function ScholarshipPreview({ scholarship, onClose }) {
  if (!scholarship) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-800">
          Scholarship not found
        </h3>
        <p className="text-sm text-slate-500 mt-1 mb-4">
          The requested scholarship record could not be loaded.
        </p>
        {onClose && (
          <Button variant="secondary" size="sm" onClick={onClose}>
            Back to Scholarships
          </Button>
        )}
      </div>
    );
  }

  const {
    name,
    provider,
    state,
    applicableClass,
    deadlineDisplay,
    benefit,
    eligibility,
    officialLink,
    status,
  } = scholarship;

  return (
    <div className="space-y-6">
      {/* Student Portal Preview Notice Bar */}
      <div className="bg-brand-50 border border-brand-200/80 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 text-brand-900">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Student View Preview
            </p>
            <p className="text-xs text-brand-900/80">
              This card simulates how students explore this opportunity on K12 Hunar.
            </p>
          </div>
        </div>

        <StatusBadge status={status} size="sm" />
      </div>

      {/* Main Student Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-br from-white via-slate-50/50 to-brand-50/30">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <StatusBadge status={status} size="md" />

            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {state}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {name}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{provider || "State Government / Scholarship Provider"}</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/60 p-4 sm:p-5">
          {/* Benefit / Amount */}
          <div className="py-2 sm:py-0 sm:px-4 first:pl-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <Gift className="w-3.5 h-3.5 text-brand-600" />
              Scholarship Benefit
            </span>
            <p className="text-sm font-bold text-brand-700 leading-snug">
              {benefit || "Scholarship benefit as specified by provider"}
            </p>
          </div>

          {/* Applicable Class */}
          <div className="py-2 sm:py-0 sm:px-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
              Applicable Class
            </span>
            <p className="text-sm font-bold text-slate-800">
              {applicableClass}
            </p>
          </div>

          {/* Deadline */}
          <div className="py-2 sm:py-0 sm:px-4 last:pr-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Application Deadline
            </span>
            <p className="text-sm font-bold text-slate-800">
              {deadlineDisplay}
            </p>
          </div>
        </div>

        {/* Eligibility Section: "Who can apply?" */}
        <div className="p-5 sm:p-6 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Who can apply? (Eligibility Criteria)
          </h3>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {eligibility || "Eligibility details can be configured by the employee."}
          </div>
        </div>

        {/* Application Section & CTA */}
        <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500 min-w-0">
            <span className="font-semibold text-slate-700 block mb-0.5">
              Official Portal Link:
            </span>
            <a
              href={officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline inline-flex items-center gap-1 break-all"
            >
              <span>{officialLink}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
            {officialLink === "https://example.com" && (
              <span className="block mt-1 text-[11px] text-amber-600 font-medium">
                ⚠ Demo placeholder — update the Official Application Link when publishing.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 justify-end flex-shrink-0">
            {onClose && (
              <Button variant="secondary" size="md" onClick={onClose}>
                Close Preview
              </Button>
            )}

            <a
              href={officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 transition-all focus-ring"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
