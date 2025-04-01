import React, { useEffect, useState } from "react";
import "../styles/DataVisualization.css"; // Import external CSS file

function DataVisualization() {
  const [visualizations, setVisualizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/get-visualizations")
      .then((response) => response.json())
      .then((data) => {
        setVisualizations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visualizations:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="visualization-container">
      <h2 className="title">Data Visualizations</h2>
      <div className="grid-container">
        {visualizations.map((viz, index) => (
          <div
            key={index}
            className={`visualization-card ${
              viz.plot_name === "Feature Distribution by Cluster" ? "wide-card" : ""
            }`}
          >
            <h3 className="chart-title">{viz.plot_name}</h3>
            {/* Display interactive plot */}
            {viz.plot_name === "Interactive Cluster Visualization" ? (
              <iframe
                src={`http://localhost:5000/${viz.plot_path}`}
                width="100%"
                height="500px"
                title={viz.plot_name}
                className="chart-image"
              />
            ) : (
              <img
                src={`http://localhost:5000/${viz.plot_path}`}
                alt={viz.plot_name}
                className="chart-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataVisualization;
