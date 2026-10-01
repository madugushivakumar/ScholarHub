import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  title = "No scholarships found",
  message = "Try changing your search keywords or adjusting your filters.",
  actionLabel = "Clear Filters",
  onAction,
  icon: Icon = SearchX
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm my-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 ring-8 ring-slate-50">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onAction && (
        <Button
          variant="outline"
          size="sm"
          icon={RotateCcw}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
