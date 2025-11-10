"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";

interface GenerateSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (summary: string) => void;
  currentSummary: string;
  onGenerate: () => Promise<string | null>;
}

export default function GenerateSummaryModal({ isOpen, onClose, onSave, currentSummary, onGenerate }: GenerateSummaryModalProps) {
  const [summary, setSummary] = useState(currentSummary);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSummary(currentSummary);
      handleGenerate();
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsLoading(true);
    const newSummary = await onGenerate();
    if (newSummary) {
      setSummary(newSummary);
    }
    setIsLoading(false);
  };

  const handleSave = () => {
    onSave(summary);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate AI Summary">
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-2 border rounded-md"
          value={isLoading ? "Generating..." : summary}
          onChange={(e) => setSummary(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </div>
    </Modal>
  );
}