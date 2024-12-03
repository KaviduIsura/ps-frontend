import React, { useState } from 'react';
import { PlusCircle, Trash2, RefreshCw } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

export function DeviceManagement() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Temperature Sensor 1',
      type: 'temperature',
      status: 'online',
      lastSeen: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Humidity Sensor 1',
      type: 'humidity',
      status: 'online',
      lastSeen: new Date().toISOString(),
    },
  ]);

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'temperature',
  });

  const handleAddDevice = () => {
    if (newDevice.name) {
      setDevices(prev => [...prev, {
        id: Date.now().toString(),
        ...newDevice,
        status: 'online',
        lastSeen: new Date().toISOString(),
      }]);
      setNewDevice({ name: '', type: 'temperature' });
      setShowAddDevice(false);
    }
  };

  const handleRemoveDevice = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Device Management</h3>
        <button
          onClick={() => setShowAddDevice(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Device
        </button>
      </div>

      <div className="space-y-4">
        {devices.map(device => (
          <div
            key={device.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h4 className="font-medium">{device.name}</h4>
              <p className="text-sm text-gray-500">Type: {device.type}</p>
              <p className="text-sm text-gray-500">
                Last seen: {new Date(device.lastSeen).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded-full text-sm ${
                device.status === 'online' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {device.status}
              </span>
              <button
                onClick={() => handleRemoveDevice(device.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold mb-4">Add New Device</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Device Name</label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Device Type</label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, type: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="temperature">Temperature Sensor</option>
                  <option value="humidity">Humidity Sensor</option>
                  <option value="light">Light Sensor</option>
                  <option value="soil">Soil Moisture Sensor</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddDevice(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}