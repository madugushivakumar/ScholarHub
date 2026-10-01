import React from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  scholarship,
}) {
  if (!scholarship) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Scholarship"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-xl border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold">Are you sure you want to delete this scholarship?</p>
            <p className="mt-1 text-red-700/80">
              This action cannot be undone. The scholarship will be removed from your CRM records.
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
          <p className="font-bold text-slate-800">{scholarship.name}</p>
          <p className="text-slate-500 mt-0.5">
            {scholarship.state} • {scholarship.applicableClass}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => {
              onConfirm(scholarship.id);
              onClose();
            }}
          >
            Delete Scholarship
          </Button>
        </div>
      </div>
    </Modal>
  );
}
