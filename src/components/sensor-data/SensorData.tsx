import React, { useState, useEffect } from 'react';
import { SensorChart } from './SensorChart';
import { getSensorData } from '../../api/api'; // Import the API function

export function SensorData() {
  const [sensorData, setSensorData] = useState<any[]>([]); // State to store fetched sensor data
  const [loading, setLoading] = useState<boolean>(true);  // State to track loading status

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await getSensorData();  // API call to fetch sensor data
        setSensorData(response.data.list);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched or error occurs
      }
    };

    fetchData();  // Call the function to fetch data
  }, []);  // Empty dependency array to run the effect only once when component mounts

  // Download function remains the same as before
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

  // Extract the necessary data for each sensor from the API response
  const temperatureData = sensorData.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.temperature,
  }));
  const humidityData = sensorData.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.humidity,
  }));
  const lightData = sensorData.map((entry) => ({
    timestamp: entry.timestamp,
    value: entry.lightIntensity,
  }));
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Sensor Data</h2>
      
      {loading ? (
        <div>Loading...</div>  // Show a loading indicator while data is being fetched
      ) : (
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
        </div>
      )}
    </div>
  );
}
