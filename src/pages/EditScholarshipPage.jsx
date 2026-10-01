import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipForm from "../components/scholarship/ScholarshipForm";
import Button from "../components/ui/Button";

export default function EditScholarshipPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getScholarshipById, updateScholarship } = useScholarships();

  const scholarship = getScholarshipById(id);

  const handleSubmit = (formData) => {
    updateScholarship(id, formData);
    navigate("/");
  };

  if (!scholarship) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">
          Scholarship not found
        </h3>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          The scholarship record with ID "{id}" could not be located in your records.
        </p>
        <Button
          variant="primary"
          size="md"
          icon={ArrowLeft}
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

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
            Edit Scholarship
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Updating: <span className="font-semibold text-slate-700">{scholarship.name}</span>
          </p>
        </div>

        <ScholarshipForm
          initialData={scholarship}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          isEdit={true}
        />
      </div>
    </div>
  );
}
