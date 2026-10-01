import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  PlusCircle,
  X,
  Sparkles,
  BookOpen
} from "lucide-react";
import { useScholarships } from "../../context/ScholarshipContext";

export default function Sidebar({ isOpen, onClose, onOpenAdd }) {
  const location = useLocation();
  const { metrics } = useScholarships();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      badge: metrics.total,
    },
    {
      name: "Scholarships",
      path: "/scholarships",
      icon: GraduationCap,
      badge: null,
    },
  ];

  const isNavActive = (path) => {
    if (path === "/" && (location.pathname === "/" || location.pathname === "/scholarships")) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 text-white font-extrabold tracking-wider text-base hover:opacity-95 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="block leading-none text-sm font-bold text-white tracking-widest uppercase">
                K12 HUNAR
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-normal">
                Scholarship CRM
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Main Menu
          </p>

          {navItems.map((item) => {
            const active = isNavActive(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-600 text-white font-semibold shadow-sm shadow-brand-600/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Add Scholarship Direct CTA */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAdd();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-brand-400" />
              <span>Add Scholarship</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-900/60 text-brand-300 border border-brand-700/50">
              New
            </span>
          </button>
        </div>

        {/* Footer / Context Info */}
        <div className="p-4 border-t border-slate-800/80 m-3 rounded-xl bg-slate-800/40">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-xs font-semibold text-slate-200">
              Assessment Edition
            </p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Internal CRM demo covering Bihar, Haryana, and Jharkhand scholarships.
          </p>
        </div>
      </aside>
    </>
  );
}
