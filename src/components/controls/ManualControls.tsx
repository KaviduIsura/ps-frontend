import React from 'react';
import { ControlPanel } from './ControlPanel';
import { Fan, Lightbulb, Droplet, Thermometer } from 'lucide-react';

export function ManualControls() {
  const handleConfirm = (type: string, value: any) => {
    // In a real application, this would send commands to the greenhouse system
    console.log(`Updating ${type}:`, value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manual Controls</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ControlPanel
          title="Fan Control"
          icon={<Fan className="w-6 h-6" />}
          type="fan"
          controls={{
            toggle: true,
            slider: {
              label: 'Speed',
              min: 0,
              max: 100,
              step: 5,
              unit: '%'
            }
          }}
          onConfirm={handleConfirm}
        />

        <ControlPanel
          title="Lighting Control"
          icon={<Lightbulb className="w-6 h-6" />}
          type="lighting"
          controls={{
            toggle: true,
            slider: {
              label: 'Brightness',
              min: 0,
              max: 100,
              step: 5,
              unit: '%'
            }
          }}
          onConfirm={handleConfirm}
        />

        <ControlPanel
          title="Irrigation Control"
          icon={<Droplet className="w-6 h-6" />}
          type="irrigation"
          controls={{
            toggle: true,
            duration: {
              options: [
                { label: '5 minutes', value: 5 },
                { label: '10 minutes', value: 10 },
                { label: '15 minutes', value: 15 },
                { label: '30 minutes', value: 30 }
              ]
            }
          }}
          onConfirm={handleConfirm}
        />

        <ControlPanel
          title="Temperature Control"
          icon={<Thermometer className="w-6 h-6" />}
          type="temperature"
          controls={{
            slider: {
              label: 'Target Temperature',
              min: 18,
              max: 30,
              step: 0.5,
              unit: '°C'
            }
          }}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}