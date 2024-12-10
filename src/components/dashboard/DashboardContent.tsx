import { StatCard } from "./StatCard";
import { Thermometer, Droplets, Sun, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { getSensorData, getControlStates1 } from "../../api/api";

export function DashboardContent() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [lightIntensity, setLightIntensity] = useState(null);
  // for the sensor status
  const [systemStatus, setSystemStatus] = useState({
    fan1: false,
    fan2: false,
    led: false,
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        // Fetch all sensor data
        const response = await getSensorData();

        // Assuming the data is an array
        const dataList = response.data.list; // Adjust this path based on your API response structure
        const latestData = dataList[dataList.length - 1]; // Get the last entry

        // Update the state with the latest sensor data
        setTemperature(latestData.temperature);
        setHumidity(latestData.humidity);
        setLightIntensity(latestData.lightIntensity);

        console.log("Latest Sensor Data:", latestData);
      } catch (err) {
        console.error("Error fetching the latest sensor data:", err);
      }
    };

    const fetchSensorStatus = async () => {
      try {
        // Fetch sensor data
        const controlStates = await getControlStates1();
        setSystemStatus(controlStates.data);
        console.log("Sensor status:", controlStates.data);
      } catch (err) {
        console.error("Sensor Status error:", err);
      }
    };

    fetchSensorData();
    fetchSensorStatus();
    const interval = setInterval(() => {
      fetchSensorData();
      fetchSensorStatus();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statusText = (isActive: boolean) => (isActive ? "Active" : "Standby");
  const statusBgColor = (isActive: boolean) =>
    isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Greenhouse Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Temperature"
          value={temperature !== null ? `${temperature}°C` : "Loading..."}
          icon={<Thermometer className="w-6 h-6" />}
          trend="up"
          trendValue="2°C from yesterday"
        />
        <StatCard
          title="Humidity"
          value={humidity !== null ? `${humidity}%` : "Loading..."}
          icon={<Droplets className="w-6 h-6" />}
          trend="down"
          trendValue="5% from yesterday"
        />
        <StatCard
          title="Light Intensity"
          value={
            lightIntensity !== null ? `${lightIntensity} lux` : "Loading..."
          }
          icon={<Sun className="w-6 h-6" />}
        />
        <StatCard
          title="Soil Moisture"
          value="0.5 m/s"
          icon={<Wind className="w-6 h-6" />}
        />
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">System Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">Temperature Controller</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${statusBgColor(
                systemStatus.fan2
              )}`}
            >
              {statusText(systemStatus.fan2)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">Humidity Controller</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${statusBgColor(
                systemStatus.fan1
              )}`}
            >
              {statusText(systemStatus.fan1)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">Lighting Controller</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${statusBgColor(
                systemStatus.led
              )}`}
            >
              {statusText(systemStatus.led)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Climate Control</span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
