import React, { useState, useEffect } from "react";
import { ControlPanel } from "./ControlPanel";
import { Fan, Lightbulb, Thermometer, Droplet } from "lucide-react";
import {
  updateControlStates1,
  getControlStates1,
  updateControlStates2,
  getControlStates2,
} from "../../api/api";

export function ManualControls() {
  const [controlStates, setControlStates] = useState({
    fan: false,
    lighting: false,
    temperature: false,
    irrigation: false,
  });

  useEffect(() => {
    // Fetch general control states
    const fetchControlStates = async () => {
      try {
        const response1 = await getControlStates1();
        const response2 = await getControlStates2();

        const data1 = response1.data;
        const data2 = response2.data;

        setControlStates({
          fan: data1.manualFan1,
          lighting: data1.manualLed,
          temperature: data1.manualFan2,
          irrigation: data2.manualIrrigation,
        });
      } catch (error) {
        console.error("Error fetching control states:", error);
      }
    };

    fetchControlStates();
  }, []);

  const handleConfirm = async (type, value) => {
    try {
      if (type === "irrigation") {
        const payload = {
          manualValve: value.enabled,
          valve: value.enabled, // Optional: Sync valve state if required
        };

        const response = await updateControlStates2(payload);
        console.log(`Successfully updated ${type}:`, response.data);

        // Update the state with the backend response
        setControlStates((prevStates) => ({
          ...prevStates,
          irrigation: response.data.newControl.manualValve,
        }));
      } else {
        const payload = {
          manual: true,
          manualFan1: type === "fan" ? value.enabled : controlStates.fan,
          manualFan2:
            type === "temperature" ? value.enabled : controlStates.temperature,
          manualLed:
            type === "lighting" ? value.enabled : controlStates.lighting,
        };

        const response = await updateControlStates1(payload);
        console.log(`Successfully updated ${type}:`, response.data);

        // Update the state with the backend response
        setControlStates((prevStates) => ({
          ...prevStates,
          [type]: value.enabled,
        }));
      }
    } catch (error) {
      console.error(`Error updating ${type} control state:`, error);
    }
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
          description="Monitor and manage water supply for irrigation. Keep your plants healthy and hydrated."
          icon={<Droplet className="w-6 h-6" />}
          type="irrigation"
          isEnabled={controlStates.irrigation}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
