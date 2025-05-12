import React from "react";
import { NavLink } from "react-router-dom";
import { FaFire, FaClipboardList, FaFileAlt } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

      <NavLink
        to="/admin/crackers"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        <FaFire />
        Crackers
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        <FaClipboardList />
        Orders Placed
      </NavLink>

      <NavLink
        to="/admin/report"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        <FaFileAlt />
        Report
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
