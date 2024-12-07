import React from 'react';
import { ControlPanel } from './ControlPanel';
import { Fan, Lightbulb, Droplet, Thermometer } from 'lucide-react';

export function ManualControls() {
  const handleConfirm = (type: string, value: any) => {
    // Simulate sending commands to the greenhouse system
    console.log(`Updating ${type}:`, value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manual Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ControlPanel
          title="Humidity Control"
          icon={<Fan className="w-6 h-6" />}
          type="fan"
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Lighting Control"
          icon={<Lightbulb className="w-6 h-6" />}
          type="lighting"
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Irrigation Control"
          icon={<Droplet className="w-6 h-6" />}
          type="irrigation"
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Temperature Control"
          icon={<Thermometer className="w-6 h-6" />}
          type="temperature"
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
