import React from 'react';
import { StatCard } from './StatCard';
import { 
  Thermometer,
  Droplets,
  Sun,
  Wind
} from 'lucide-react';

export function DashboardContent() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Greenhouse Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Temperature"
          value="24°C"
          icon={<Thermometer className="w-6 h-6" />}
          trend="up"
          trendValue="2°C from yesterday"
        />
        <StatCard
          title="Humidity"
          value="65%"
          icon={<Droplets className="w-6 h-6" />}
          trend="down"
          trendValue="5% from yesterday"
        />
        <StatCard
          title="Light Intensity"
          value="850 lux"
          icon={<Sun className="w-6 h-6" />}
        />
        <StatCard
          title="Air Flow"
          value="0.5 m/s"
          icon={<Wind className="w-6 h-6" />}
        />
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">System Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">Ventilation System</span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Active</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">Irrigation System</span>
            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">Standby</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">Lighting System</span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Active</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Climate Control</span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}