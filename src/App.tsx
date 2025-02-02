import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { DashboardContent } from "./components/dashboard/DashboardContent";
import { SensorData } from "./components/sensor-data/SensorData";
import { ManualControls } from "./components/controls/ManualControls";
import { Settings } from "./components/settings/Settings";
import Login from "./components/Login";

import AddUserForm from "./components/users/AddUserForm";

import Users from "./components/users/Users";
import EditUserForm from "./components/users/ediUser";
import AboutPage from "./components/about";
import DiseaseDetection from "./components/disease-detection/Disease";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Sidebar />
              <div className="ml-64">
                <Routes>
                  <Route path="/dashboard" element={<DashboardContent />} />
                  <Route path="/register" element={<AddUserForm />} />
                  <Route path="/sensor-data" element={<SensorData />} />
                  <Route path="/controls" element={<ManualControls />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/edit-user" element={<EditUserForm />} />
                  <Route path="/diseases" element={<DiseaseDetection />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
