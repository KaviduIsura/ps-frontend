import React from "react";
import { NavLink } from "./NavLink";
import {
  LayoutDashboard,
  LineChart,
  Sliders,
  Settings,
  Info,
  Leaf,
  User,
  LogOut,
} from "lucide-react";
import { FaPlantWilt } from "react-icons/fa6";

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-green-800 text-white p-4 fixed left-0 top-0 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="w-8 h-8" />
        <h1 className="text-xl font-bold">Green Control</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <NavLink to="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />}>
          Dashboard
        </NavLink>
        <NavLink to="/sensor-data" icon={<LineChart className="w-5 h-5" />}>
          Sensor Data
        </NavLink>
        <NavLink to="/controls" icon={<Sliders className="w-5 h-5" />}>
          Manual Controls
        </NavLink>
        <NavLink to="/diseases" icon={<FaPlantWilt className="w-5 h-5" />}>
          Detect Diseases
        </NavLink>
        <NavLink to="/settings" icon={<Settings className="w-5 h-5" />}>
          Settings
        </NavLink>
        <NavLink to="/users" icon={<User className="w-5 h-5" />}>
          Users
        </NavLink>
        <NavLink to="/about" icon={<Info className="w-5 h-5" />}>
          About
        </NavLink>
      </nav>

      <NavLink to="/" icon={<LogOut className="w-5 h-5" />}>
        LogOut
      </NavLink>
    </div>
  );
}
