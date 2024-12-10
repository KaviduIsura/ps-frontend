import React, { useState, useEffect } from 'react';
import { Switch } from './Switch';
import { ConfirmDialog } from './ConfirmDialog';

interface ControlPanelProps {
  title: string;
  icon: React.ReactNode;
  type: string;
  isEnabled: boolean;
  onConfirm: (type: string, value: any) => void;
}

export function ControlPanel({ title, icon, type, isEnabled, onConfirm }: ControlPanelProps) {
  const [localEnabled, setLocalEnabled] = useState(isEnabled);

  useEffect(() => {
    setLocalEnabled(isEnabled);
  }, [isEnabled]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any>(null);

  const handleChange = (checked: boolean) => {
    const changes = { enabled: checked };
    setPendingChanges(changes);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onConfirm(type, pendingChanges);
    setLocalEnabled(pendingChanges.enabled);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-green-600">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-600">Power</span>
        <Switch
          checked={localEnabled}
          onChange={handleChange}
        />
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        changes={pendingChanges}
        type={type}
      />
    </div>
  );
}