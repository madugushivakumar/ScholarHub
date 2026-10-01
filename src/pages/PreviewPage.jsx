import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipPreview from "../components/scholarship/ScholarshipPreview";
import Button from "../components/ui/Button";

export default function PreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getScholarshipById } = useScholarships();

  const scholarship = getScholarshipById(id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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

      <ScholarshipPreview
        scholarship={scholarship}
        onClose={() => navigate("/")}
      />
    </div>
  );
}
