import React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export default function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  const { message, type = "success" } = toast;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      border: "border-emerald-200",
      bg: "bg-white",
      badge: "bg-emerald-50 text-emerald-700"
    },
    error: {
      icon: AlertCircle,
      iconColor: "text-red-500",
      border: "border-red-200",
      bg: "bg-white",
      badge: "bg-red-50 text-red-700"
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      border: "border-amber-200",
      bg: "bg-white",
      badge: "bg-amber-50 text-amber-700"
    },
    info: {
      icon: Info,
      iconColor: "text-blue-500",
      border: "border-blue-200",
      bg: "bg-white",
      badge: "bg-blue-50 text-blue-700"
    }
  };

  const config = typeConfig[type] || typeConfig.success;
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${config.border} ${config.bg} shadow-lg shadow-slate-200/50 transition-all duration-300 transform translate-y-0`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 text-sm font-medium text-slate-800 leading-snug">
        {message}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-md hover:bg-slate-100"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
