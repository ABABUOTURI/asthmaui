import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function ExcelUploader() {
  const [data, setData] = useState([]);

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("excelData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const sheet = workbook.Sheets[sheetName];

        // Convert Excel sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Remove empty rows
        const filteredData = jsonData.filter((row) => row.length > 0);

        // Save data in state & localStorage
        setData(filteredData);
        localStorage.setItem("excelData", JSON.stringify(filteredData));
      };
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Upload Excel File</h2>

      {/* File Upload Input */}
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
        className="my-2 p-2 border rounded"
      />

      {/* Display Table if Data Exists */}
      {data.length > 0 && (
        <div className="overflow-auto mt-4">
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                {data[0].map((col, index) => (
                  <th key={index} className="border border-gray-400 p-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="border border-gray-400">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-400 p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExcelUploader;
