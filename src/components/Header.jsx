import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; 
import { FaBroom, FaTable, FaChartBar, FaProjectDiagram, FaFileUpload  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section */}
      <div className="header bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Asthma Data Analysis</h1>
        
        {/* Menu Icon */}
        <button 
          className="text-white text-2xl focus:outline-none"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Section */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Close Button */}
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
          ×
        </button>

        {/* Sidebar Menu */}
        <ul>
          <li className="sidebar-item" onClick={() => { navigate("/uploading"); setIsSidebarOpen(false); }}>
            <FaFileUpload  className="icon" />Excel Upload
          </li>
          <li className="sidebar-item" onClick={() => { navigate("/data-cleaning"); setIsSidebarOpen(false); }}>
            <FaBroom className="icon" /> Data Cleaning
          </li>
          <li className="sidebar-item" onClick={() => { navigate("/data-table"); setIsSidebarOpen(false); }}>
            <FaTable className="icon" /> Data Table
          </li>
          <li className="sidebar-item" onClick={() => { navigate("/data-visualization"); setIsSidebarOpen(false); }}>
            <FaChartBar className="icon" /> Data Visualization
          </li>
          <li className="sidebar-item" onClick={() => { navigate("/clustering"); setIsSidebarOpen(false); }}>
            <FaProjectDiagram className="icon" /> Clustering
          </li>
        </ul>
      </div>

      {/* Overlay when Sidebar is Open */}
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
}

export default Header;
