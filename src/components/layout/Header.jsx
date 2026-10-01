import React from "react";
import { Menu, Bell, User } from "lucide-react";

export default function Header({
  onToggleSidebar,
  title = "Scholarship Management",
  subtitle = "Manage, review and publish scholarship opportunities.",
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between transition-all">
      {/* Left: Mobile hamburger menu & page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 font-normal">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Employee Profile & Quick Visual Actions */}
      <div className="flex items-center gap-3">
        {/* Subtle Notification Badge */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white"></span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        {/* Employee Avatar & Tag */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs ring-2 ring-brand-600/10">
            EM
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-semibold text-slate-800 leading-none">
              Employee
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-none">
              CRM Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
