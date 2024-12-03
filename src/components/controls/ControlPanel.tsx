import React, { useState } from 'react';
import { Switch } from './Switch';
import { Slider } from './Slider';
import { ConfirmDialog } from './ConfirmDialog';

interface ControlOption {
  label: string;
  value: number;
}

interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

interface ControlsConfig {
  toggle?: boolean;
  slider?: SliderConfig;
  duration?: {
    options: ControlOption[];
  };
}

interface ControlPanelProps {
  title: string;
  icon: React.ReactNode;
  type: string;
  controls: ControlsConfig;
  onConfirm: (type: string, value: any) => void;
}

export function ControlPanel({ title, icon, type, controls, onConfirm }: ControlPanelProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(controls.slider?.min || 0);
  const [duration, setDuration] = useState<number | null>(
    controls.duration?.options[0].value || null
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any>(null);

  const handleChange = (changes: any) => {
    setPendingChanges(changes);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onConfirm(type, pendingChanges);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-green-600">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="space-y-6">
        {controls.toggle && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Power</span>
            <Switch
              checked={isEnabled}
              onChange={(checked) => handleChange({ ...pendingChanges, enabled: checked })}
            />
          </div>
        )}

        {controls.slider && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{controls.slider.label}</span>
              <span className="text-sm font-medium">
                {sliderValue}{controls.slider.unit}
              </span>
            </div>
            <Slider
              min={controls.slider.min}
              max={controls.slider.max}
              step={controls.slider.step}
              value={sliderValue}
              onChange={(value) => handleChange({ ...pendingChanges, value })}
            />
          </div>
        )}

        {controls.duration && (
          <div className="space-y-2">
            <label className="block text-gray-600">Duration</label>
            <select
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={duration || ''}
              onChange={(e) => handleChange({ duration: Number(e.target.value) })}
            >
              {controls.duration.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
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