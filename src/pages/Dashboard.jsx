// import React, { useState } from "react";
// import "../styles/Dashboard.css";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const Dashboard = () => {
//   // Initialize state with `null` or a default component
//   const [activeComponent, setActiveComponent] = useState(null);

//   // Function to update the content dynamically
//   const handleNavigation = (component) => {
//     setActiveComponent(component);
//   };

//   return (
//     <div className="admin-container">
//       {/* Sidebar with Navigation Handling */}
//       <Sidebar onNavigate={handleNavigation} />

//       {/* Main content area remains fixed */}
//       <div className="main-content">
//         <Header />
        
//         {/* Dynamic Content Container */}
//         <div className="main-contents">
//           {/* Render activeComponent if set, otherwise show a default message */}
//           {activeComponent || <h2>Welcome to the Dashboard</h2>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import DataCleaning from "./DataCleaning";
import DataTable from "./DataTable";
import DataVisualization from "./DataVisualization";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Data Cleaning Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Data Cleaning</h2>
        <DataCleaning />
      </section>

      {/* Data Table Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Cleaned Data Table</h2>
        <DataTable />
      </section>

      {/* Data Visualization Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Data Visualization</h2>
        <DataVisualization />
      </section>
    </div>
  );
}

export default Dashboard;
