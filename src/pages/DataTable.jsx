import React, { useState, useEffect } from "react";
import "../styles/DataTable.css";

function DataTable() {
  const [cleanedData, setCleanedData] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/cleaned-data"); // Use your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const rawData = await response.json();

        // Ensure column names match exactly as stored in the database
        const formattedData = rawData.map((item) => ({
          location: item.Location || "Unknown",
          temperature: item.Temparature !== undefined ? item.Temparature : "N/A",
          humidity: item.Humidity !== undefined ? item.Humidity : "N/A",
          date: item.Date || "Unknown",
          time: item.Time || "Unknown",
          airFreshness: item["Air Freshness"] !== undefined ? item["Air Freshness"] : "Unknown",
        }));

        setCleanedData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-4">Loading data...</p>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error fetching data: {error}</p>
        <p>Please check the API URL or try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Table</h2>
      <input
        type="text"
        placeholder="Filter by location..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Location</th>
            <th className="border p-2">Temperature (°C)</th>
            <th className="border p-2">Humidity (%)</th>
            <th className="border p-2">Air Freshness</th>
          </tr>
        </thead>
        <tbody>
          {cleanedData
            .filter((row) => (row.location ? String(row.location).toLowerCase() : "").includes(filter.toLowerCase()))
            .map((row, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{row.location}</td>
                <td className="border p-2">{row.temperature}</td>
                <td className="border p-2">{row.humidity}</td>
                <td className="border p-2">{row.airFreshness}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
