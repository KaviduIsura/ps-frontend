import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  changes: any;
  type: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, changes, type }: ConfirmDialogProps) {
  if (!isOpen) return null;

  const formatChanges = () => {
    const parts = [];
    if (changes.enabled !== undefined) {
      parts.push(`Power: ${changes.enabled ? 'On' : 'Off'}`);
    }
    if (changes.value !== undefined) {
      parts.push(`Value: ${changes.value}`);
    }
    if (changes.duration !== undefined) {
      parts.push(`Duration: ${changes.duration} minutes`);
    }
    return parts.join(', ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to apply the following changes to the {type} system?
          <br />
          <span className="font-medium">{formatChanges()}</span>
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}