import React from "react";
import { GraduationCap, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function SummaryCard({
  type = "total", // "total" | "published" | "draft" | "expired"
  count = 0,
  isActive = false,
  onClick,
}) {
  const configs = {
    total: {
      title: "Total Scholarships",
      icon: GraduationCap,
      colorClass: "text-brand-600 bg-brand-50 border-brand-100",
      activeRing: "ring-2 ring-brand-500 bg-brand-50/50",
      countColor: "text-slate-900",
      subtext: "Across all registered states",
    },
    published: {
      title: "Published",
      icon: CheckCircle2,
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      activeRing: "ring-2 ring-emerald-500 bg-emerald-50/50",
      countColor: "text-emerald-700",
      subtext: "Active & visible to students",
    },
    draft: {
      title: "Draft",
      icon: Clock,
      colorClass: "text-amber-600 bg-amber-50 border-amber-100",
      activeRing: "ring-2 ring-amber-500 bg-amber-50/50",
      countColor: "text-amber-700",
      subtext: "Pending review or revision",
    },
    expired: {
      title: "Expired",
      icon: AlertCircle,
      colorClass: "text-rose-600 bg-rose-50 border-rose-100",
      activeRing: "ring-2 ring-rose-500 bg-rose-50/50",
      countColor: "text-rose-700",
      subtext: "Past application window",
    },
  };

  const config = configs[type] || configs.total;
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle transition-all duration-200 ${
        onClick
          ? "cursor-pointer hover:shadow-card hover:-translate-y-0.5"
          : ""
      } ${isActive ? config.activeRing : "hover:border-slate-300"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {config.title}
          </p>
          <p className={`text-3xl font-extrabold mt-1.5 tracking-tight ${config.countColor}`}>
            {count}
          </p>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${config.colorClass}`}>
          <Icon className="w-6 h-6 flex-shrink-0" />
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span>{config.subtext}</span>
        {onClick && (
          <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-600">
            {isActive ? "Active Filter" : "Filter"}
          </span>
        )}
      </p>
    </div>
  );
}
