import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipForm from "../components/scholarship/ScholarshipForm";
import Button from "../components/ui/Button";

export default function AddScholarshipPage() {
  const navigate = useNavigate();
  const { addScholarship } = useScholarships();

  const handleSubmit = (formData) => {
    addScholarship(formData);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Add New Scholarship
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete the fields below to register a scholarship opportunity in the CRM.
          </p>
        </div>

        <ScholarshipForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          isEdit={false}
        />
      </div>
    </div>
  );
}
