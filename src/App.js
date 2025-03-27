import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import DataCleaning from "./pages/DataCleaning";
import DataTable from "./pages/DataTable";
import DataVisualization from "./pages/DataVisualization";
import Clustering from "./pages/Clustering";
import ExcelUploader from "./pages/ExcelUploader";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
       
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-4 overflow-auto">
          
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/data-cleaning" element={<DataCleaning />} />
              <Route path="/data-table" element={<DataTable />} />
              <Route path="/data-visualization" element={<DataVisualization />} />
              <Route path="/clustering" element={<Clustering />} />
              <Route path="/uploading" element={<ExcelUploader />} />
              <Route path="/" element={<DataTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
