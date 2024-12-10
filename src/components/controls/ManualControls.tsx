import React, { useState, useEffect } from "react";
import { ControlPanel } from "./ControlPanel";
import { Fan, Lightbulb, Thermometer, Droplet } from "lucide-react";
import { updateControlStates1, getControlStates1 } from "../../api/api";

export function ManualControls() {
  const [controlStates, setControlStates] = useState({
    fan: false,
    lighting: false,
    temperature: false,
  });

  useEffect(() => {
    // Fetch the current control states
    getControlStates1()
      .then((response) => {
        const data = response.data;
        setControlStates({
          fan: data.manualFan1,
          lighting: data.manualLed,
          temperature: data.manualFan2, // Temperature uses manualFan2
        });
      })
      .catch((error) => {
        console.error("Error fetching control states:", error);
      });
  }, []);

  const handleConfirm = (type: string, value: any) => {
    const payload = {
      manual: true,
      manualFan1: type === "fan" ? value.enabled : controlStates.fan,
      manualFan2:
        type === "temperature" ? value.enabled : controlStates.temperature,
      manualLed: type === "lighting" ? value.enabled : controlStates.lighting,
    };
    updateControlStates1(payload)
      .then((response) => {
        console.log(`Successfully updated ${type}:`, response.data);
        setControlStates((prevStates) => ({
          ...prevStates,
          [type]: value.enabled,
        }));
      })
      .catch((error) => {
        console.error("Error updating control state:", error);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manual Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ControlPanel
          title="Temperature Control"
          description="Maintain the ideal temperature for your environment. Adjust settings to ensure optimal comfort and efficiency."
          icon={<Thermometer className="w-6 h-6" />}
          type="temperature"
          isEnabled={controlStates.temperature}
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Humidity Control"
          description="Regulate the humidity levels to create a balanced atmosphere. Ideal for sensitive materials or comfort."
          icon={<Fan className="w-6 h-6" />}
          type="fan"
          isEnabled={controlStates.fan}
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Lighting Control"
          description="Customize your lighting preferences. Create the perfect ambiance or ensure proper visibility."
          icon={<Lightbulb className="w-6 h-6" />}
          type="lighting"
          isEnabled={controlStates.lighting}
          onConfirm={handleConfirm}
        />
        <ControlPanel
          title="Irrigation Control"
          description="Monitor and manage water supply for irrigation. Keep your plants healthy and hydrated. (Coming Soon)"
          icon={<Droplet className="w-6 h-6" />}
          type="irrigation"
          isEnabled={false} // Placeholder as per the requirement
          onConfirm={() => {}}
        />
      </div>
    </div>
  );
}
