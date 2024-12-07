import React from 'react';
import { ControlPanel } from './ControlPanel';
import { Fan, Lightbulb, Droplet, Thermometer } from 'lucide-react';
import { updateControlStates1 } from '../../api/api'; 

export function ManualControls() {
  const handleConfirm = (type: string, value: any) => {
    const payload = {
      fan1: value.enabled,  // Assuming 'enabled' controls the fan1 status
      fan2: value.enabled,  // Assuming 'enabled' controls the fan2 status
      led: value.enabled,   // Assuming 'enabled' controls the LED status
      manual: true,         // Set 'manual' to true, since it's a manual change
      manualFan1: value.enabled,  // Similarly, control manualFan1
      manualFan2: value.enabled,  // Similarly, control manualFan2
      manualLed: value.enabled   // Similarly, control manualLed
    };
    // Call the API to update control states
  updateControlStates1(payload)
  .then(response => {
    console.log(`Successfully updated ${type}:`, response.data);
  })
  .catch(error => {
    console.error('Error updating control state:', error);
  });
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
