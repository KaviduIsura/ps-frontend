import React from "react";
import { ThresholdSettings } from "./ThresholdSettings";
import { UserPreferences } from "./UserPreferences";
import { DeviceManagement } from "./DeviceManagement";

export function Settings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="space-y-6">
        <DeviceManagement />
        <UserPreferences />
      </div>
    </div>
  );
}
