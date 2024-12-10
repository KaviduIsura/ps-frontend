import { StatCard } from "./StatCard";
import { Thermometer, Droplets, Sun, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getSensorData,
  getControlStates1,
  getSensorData2,
  getControlStates2,
} from "../../api/api";

export function DashboardContent() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [lightIntensity, setLightIntensity] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [motionDetected, setMotionDetected] = useState(null);
  // for the sensor status
  const [systemStatus, setSystemStatus] = useState({
    fan1: false,
    fan2: false,
    led: false,
    valve: false,
    ledMotion: false,
  });

  useEffect(() => {
    // Fetch all sensor data from 1st node mcu
    const fetchSensorData = async () => {
      try {
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

    // Get sensor data from 2nd nodemcu
    const fetchSensorData2 = async () => {
      try {
        const response = await getSensorData2();

        // Assuming the data is an array
        const dataList = response.data.list; // Adjust this path based on your API response structure
        const latestData = dataList[dataList.length - 1]; // Get the last entry

        // Update the state with the latest sensor data
        setSoilMoisture(latestData.soilMoisture);
        setMotionDetected(latestData.motionDetected);

        console.log("Latest Sensor Data:", latestData);
      } catch (err) {
        console.error("Error fetching the latest sensor data:", err);
      }
    };

    // Fetch Accurator data of 1st node mcu
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
    // Fetch Accurator data of 2st node mcu
    const fetchSensorStatus2 = async () => {
      try {
        // Fetch sensor data
        const controlStates = await getControlStates2();
        setSystemStatus(controlStates.data);
        console.log("Sensor status:", controlStates.data);
      } catch (err) {
        console.error("Sensor Status error:", err);
      }
    };

    fetchSensorData();
    fetchSensorData2();
    fetchSensorStatus();
    fetchSensorStatus2();
    const interval = setInterval(() => {
      fetchSensorData();
      fetchSensorData2();
      fetchSensorStatus();
      fetchSensorStatus2();
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
          value={lightIntensity !== null ? `${lightIntensity} %` : "Loading..."}
          icon={<Sun className="w-6 h-6" />}
        />
        <StatCard
          title="Soil Moisture"
          value={soilMoisture !== null ? `${soilMoisture} %` : "Loading..."}
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
            <span className="text-gray-600">Irrigation Controller</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${statusBgColor(
                systemStatus.valve
              )}`}
            >
              {statusText(systemStatus.valve)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
