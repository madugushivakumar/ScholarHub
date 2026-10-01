import React from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { RefreshCw } from "lucide-react";

export default function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Demo Data"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-200">
          <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold">Restore Initial Assessment Dataset?</p>
            <p className="mt-1 text-amber-800/80">
              This will reset the database back to the exact initial 9 records specified in the assessment (3 Published, 3 Draft, 3 Expired). Any manual additions or modifications will be replaced.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm & Reset
          </Button>
        </div>
      </div>
    </Modal>
  );
}
