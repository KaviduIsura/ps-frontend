import React from 'react';

interface ThresholdInputProps {
  label: string;
  unit: string;
  min: number;
  max: number;
  onChange: (type: 'min' | 'max', value: number) => void;
}

export function ThresholdInput({ label, unit, min, max, onChange }: ThresholdInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-500">Minimum</span>
          <div className="mt-1 relative">
            <input
              type="number"
              value={min}
              onChange={(e) => onChange('min', Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              {unit}
            </span>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Maximum</span>
          <div className="mt-1 relative">
            <input
              type="number"
              value={max}
              onChange={(e) => onChange('max', Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              {unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}