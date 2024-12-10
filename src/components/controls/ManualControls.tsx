import React, { useState, useEffect } from 'react';
import { ControlPanel } from './ControlPanel';
import { Fan, Lightbulb, Droplet, Thermometer } from 'lucide-react';
import { updateControlStates1, getControlStates1 } from '../../api/api'; 

export function ManualControls() {
  const [controlStates, setControlStates] = useState({
    fan: false,
    lighting: false,
    irrigation: false,
    temperature: false,
  });

  useEffect(() => {
    // Fetch the current control states
    getControlStates1()
      .then(response => {
        const data = response.data;
        setControlStates({
          fan: data.manualFan1,
          lighting: data.manualLed,
          irrigation: false, // Update with correct data if available
          temperature: data.manualFan2, // Update with correct data if available
        });
      })
      .catch(error => {
        console.error('Error fetching control states:', error);
      });
  }, []);

  const handleConfirm = (type: string, value: any) => {
    const payload = {
      manual: true,
      manualFan1: type === 'fan' ? value.enabled : controlStates.fan,
      manualFan2: type === 'temperature' ? value.enabled : controlStates.temperature,
      manualLed: type === 'lighting' ? value.enabled : controlStates.lighting,
      // Add other controls as needed
    };
    updateControlStates1(payload)
      .then(response => {
        console.log(`Successfully updated ${type}:`, response.data);
        setControlStates(prevStates => ({
          ...prevStates,
          [type]: value.enabled,
        }));
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
          isEnabled={controlStates.fan}
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Lighting Control"
          icon={<Lightbulb className="w-6 h-6" />}
          type="lighting"
          isEnabled={controlStates.lighting}
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Irrigation Control"
          icon={<Droplet className="w-6 h-6" />}
          type="irrigation"
          isEnabled={controlStates.irrigation}
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Temperature Control"
          icon={<Thermometer className="w-6 h-6" />}
          type="temperature"
          isEnabled={controlStates.temperature}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}