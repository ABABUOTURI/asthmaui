import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/Clustering.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function Clustering() {
  const [clusters, setClusters] = useState([]);

  const generateClusters = () => {
    // Simulate clustering results
    const clusterData = [
      { x: 30, y: 60, cluster: "A" },
      { x: 28, y: 75, cluster: "B" },
      { x: 35, y: 80, cluster: "C" },
      { x: 32, y: 65, cluster: "A" },
      { x: 29, y: 70, cluster: "B" },
    ];
    setClusters(clusterData);
  };

  const colors = { A: "red", B: "blue", C: "green" };

  const clusterChartData = {
    datasets: clusters.map((point) => ({
      label: `Cluster ${point.cluster}`,
      data: [{ x: point.x, y: point.y }],
      backgroundColor: colors[point.cluster],
      pointRadius: 6,
    })),
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clustering Results</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        onClick={generateClusters}
      >
        Perform Clustering
      </button>
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Temperature vs Humidity Clusters</h3>
        <Scatter data={clusterChartData} options={{ scales: { x: { title: { display: true, text: "Temperature (°C)" } }, y: { title: { display: true, text: "Humidity (%)" } } } }} />
      </div>
    </div>
  );
}

export default Clustering;
