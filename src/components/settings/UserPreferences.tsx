import React, { useState } from 'react';
import { Moon, Sun, Bell } from 'lucide-react';
import { Switch } from '../controls/Switch';

export function UserPreferences() {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: {
      email: true,
      push: true,
      alerts: true,
    },
    timezone: 'UTC',
  });

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
  ];

  const handleNotificationChange = (key: keyof typeof preferences.notifications) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">User Preferences</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {preferences.darkMode ? (
              <Moon className="w-5 h-5 text-gray-600" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600" />
            )}
            <span className="text-gray-700">Dark Mode</span>
          </div>
          <Switch
            checked={preferences.darkMode}
            onChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Notifications</span>
          </div>
          
          <div className="ml-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email Notifications</span>
              <Switch
                checked={preferences.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Push Notifications</span>
              <Switch
                checked={preferences.notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Alert Sounds</span>
              <Switch
                checked={preferences.notifications.alerts}
                onChange={() => handleNotificationChange('alerts')}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">Time Zone</label>
          <select
            value={preferences.timezone}
            onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}