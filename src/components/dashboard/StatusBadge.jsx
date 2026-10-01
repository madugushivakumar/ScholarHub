import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function StatusBadge({ status, size = "md", className = "" }) {
  const configs = {
    Published: {
      label: "Published",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      icon: CheckCircle2,
    },
    Draft: {
      label: "Draft",
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      icon: Clock,
    },
    Expired: {
      label: "Expired",
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
      icon: AlertCircle,
    },
  };

  const current = configs[status] || {
    label: status || "Unknown",
    bg: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
    icon: Clock,
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${sizeStyles[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} animate-pulse`} />
      <span>{current.label}</span>
    </span>
  );
}
