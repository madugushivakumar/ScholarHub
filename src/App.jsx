import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ScholarshipProvider } from "./context/ScholarshipContext";
import { ToastProvider } from "./context/ToastContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import PageContainer from "./components/layout/PageContainer";
import Dashboard from "./pages/Dashboard";
import AddScholarshipPage from "./pages/AddScholarshipPage";
import EditScholarshipPage from "./pages/EditScholarshipPage";
import PreviewPage from "./pages/PreviewPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAdd = () => {
    navigate("/scholarships/add");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenAdd={handleOpenAdd}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          title="Scholarship Management"
          subtitle="Manage, review and publish scholarship opportunities across Bihar, Haryana, and Jharkhand."
        />

        {/* Dynamic Route Content */}
        <PageContainer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scholarships" element={<Dashboard />} />
            <Route path="/scholarships/add" element={<AddScholarshipPage />} />
            <Route path="/scholarships/:id/edit" element={<EditScholarshipPage />} />
            <Route path="/scholarships/:id/preview" element={<PreviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageContainer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ScholarshipProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppLayout />
        </BrowserRouter>
      </ScholarshipProvider>
    </ToastProvider>
  );
}
