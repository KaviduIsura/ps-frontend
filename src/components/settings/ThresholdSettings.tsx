import React, { useState } from 'react';
import { ThresholdInput } from './ThresholdInput';
import { Save } from 'lucide-react';

export function ThresholdSettings() {
  const [thresholds, setThresholds] = useState({
    temperature: { min: 18, max: 28 },
    humidity: { min: 60, max: 80 },
    light: { min: 500, max: 1000 },
    soilMoisture: { min: 30, max: 70 },
  });

  const handleChange = (key: string, type: 'min' | 'max', value: number) => {
    setThresholds(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof typeof prev], [type]: value }
    }));
  };

  const handleSave = () => {
    console.log('Saving thresholds:', thresholds);
    // In a real app, this would save to backend
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Threshold Configurations</h3>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ThresholdInput
          label="Temperature"
          unit="°C"
          min={thresholds.temperature.min}
          max={thresholds.temperature.max}
          onChange={(type, value) => handleChange('temperature', type, value)}
        />
        <ThresholdInput
          label="Humidity"
          unit="%"
          min={thresholds.humidity.min}
          max={thresholds.humidity.max}
          onChange={(type, value) => handleChange('humidity', type, value)}
        />
        <ThresholdInput
          label="Light Intensity"
          unit="lux"
          min={thresholds.light.min}
          max={thresholds.light.max}
          onChange={(type, value) => handleChange('light', type, value)}
        />
        <ThresholdInput
          label="Soil Moisture"
          unit="%"
          min={thresholds.soilMoisture.min}
          max={thresholds.soilMoisture.max}
          onChange={(type, value) => handleChange('soilMoisture', type, value)}
        />
      </div>
    </div>
  );
}