import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFire,
  FaClipboardList,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
      isActive ? "bg-gray-700" : ""
    }`;

  return (
    <>
      {/* Hamburger Icon - only on small devices */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-800 p-2 rounded"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg z-50
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

        <NavLink
          to="/admin/crackers"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaFire />
          Crackers
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaClipboardList />
          Orders Placed
        </NavLink>

        <NavLink
          to="/admin/report"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaFileAlt />
          Report
        </NavLink>
      </div>
    </>
  );
};

export default AdminSidebar;
