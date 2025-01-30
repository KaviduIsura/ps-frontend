import React, { useState, useEffect } from "react";
import { Switch } from "./Switch";
import { ConfirmDialog } from "./ConfirmDialog";

interface ControlPanelProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
  isEnabled: boolean;
  onConfirm: (type: string, value: { enabled: boolean }) => void;
}

export function ControlPanel({
  title,
  description,
  icon,
  type,
  isEnabled,
  onConfirm,
}: ControlPanelProps) {
  const [localEnabled, setLocalEnabled] = useState(isEnabled);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{
    enabled: boolean;
  } | null>(null);

  // Sync local state with parent state
  useEffect(() => {
    setLocalEnabled(isEnabled);
  }, [isEnabled]);

  const handleChange = (checked: boolean) => {
    setPendingChanges({ enabled: checked });
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (pendingChanges) {
      onConfirm(type, pendingChanges);
      setLocalEnabled(pendingChanges.enabled);
    }
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setPendingChanges(null);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-green-600">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <p className="text-gray-500 text-sm mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <span className="text-gray-600">Power</span>
        <Switch checked={localEnabled} onChange={handleChange} />
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        changes={pendingChanges}
        type={type}
      />
    </div>
  );
}
