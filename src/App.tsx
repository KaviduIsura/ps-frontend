import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { SensorData } from './components/sensor-data/SensorData';
import { ManualControls } from './components/controls/ManualControls';
import { Settings } from './components/settings/Settings';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/sensor-data" element={<SensorData />} />
            <Route path="/controls" element={<ManualControls />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;