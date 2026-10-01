import React from "react";

export default function LoadingState({ count = 3, type = "table" }) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4">
            <div className="flex justify-between items-start">
              <div className="h-5 bg-slate-200 rounded w-2/3"></div>
              <div className="h-5 bg-slate-200 rounded-full w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <div className="h-8 bg-slate-100 rounded w-1/3"></div>
              <div className="h-8 bg-slate-100 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 overflow-hidden animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-slate-200"></div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-3 bg-slate-100 rounded w-1/4"></div>
            </div>
            <div className="h-6 bg-slate-100 rounded w-20"></div>
            <div className="h-6 bg-slate-100 rounded w-24"></div>
            <div className="h-6 bg-slate-200 rounded-full w-20"></div>
            <div className="h-8 bg-slate-100 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
