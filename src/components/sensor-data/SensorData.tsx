import React from 'react';
import { SensorChart } from './SensorChart';
import { generateMockData } from './mockData';

export function SensorData() {
  const handleDownload = (sensorType: string, data: any[]) => {
    const csvContent = [
      ['Timestamp', 'Value'],
      ...data.map(point => [point.timestamp, point.value])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sensorType.toLowerCase()}_data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const temperatureData = generateMockData(20, 26);
  const humidityData = generateMockData(60, 70);
  const lightData = generateMockData(800, 900);
  const airFlowData = generateMockData(0.3, 0.7);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Sensor Data</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="Temperature"
          data={temperatureData}
          unit="°C"
          color="#ef4444"
          onDownload={() => handleDownload('temperature', temperatureData)}
        />
        <SensorChart
          title="Humidity"
          data={humidityData}
          unit="%"
          color="#3b82f6"
          onDownload={() => handleDownload('humidity', humidityData)}
        />
        <SensorChart
          title="Light Intensity"
          data={lightData}
          unit=" lux"
          color="#f59e0b"
          onDownload={() => handleDownload('light', lightData)}
        />
        <SensorChart
          title="Air Flow"
          data={airFlowData}
          unit=" m/s"
          color="#10b981"
          onDownload={() => handleDownload('airflow', airFlowData)}
        />
      </div>
    </div>
  );
}