// import React, { useState, useEffect } from "react";
// import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
// import axios from "axios";
// import * as XLSX from "xlsx"; // To parse Excel files
// import "../styles/DataCleaning.css";

// function DataCleaning({ uploadedFile }) {
//   const [removedData, setRemovedData] = useState([]);
//   const [issues, setIssues] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     // fetchCleanedData();
//   }, [fetchCleanedData]);

//   // Fetch cleaned data from API
//   const fetchCleanedData = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/api/cleaned-data");
//       if (uploadedFile) {
//         compareData(response.data, uploadedFile);
//       }
//     } catch (error) {
//       console.error("Error fetching cleaned data:", error);
//     }
//   };

//   // Parse uploaded Excel file
//   const parseExcel = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryString = event.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//         resolve(sheet);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsBinaryString(file);
//     });
//   };

//   // Compare uploaded data with cleaned data
//   const compareData = async (cleaned, file) => {
//     try {
//       const uploadedData = await parseExcel(file);
//       let removed = [];
//       let detectedIssues = [];

//       uploadedData.forEach((row, index) => {
//         const matched = cleaned.find((item) => item.Location === row.Location);
        
//         if (!matched) {
//           removed.push({
//             index,
//             Location: row.Location || "N/A",
//             Temperature: row.Temperature || "N/A",
//             Humidity: row.Humidity || "N/A",
//             Reason: "Data removed due to inconsistencies or missing values",
//           });
//         } else {
//           if (!row.Temperature || isNaN(row.Temperature)) {
//             detectedIssues.push({ index, field: "Temperature", issue: "Missing/Invalid Value" });
//           }
//           if (!row.Date || !row.Date.match(/^\d{4}-\d{2}-\d{2}$/)) {
//             detectedIssues.push({ index, field: "Date", issue: "Incorrect Format" });
//           }
//         }
//       });

//       setRemovedData(removed);
//       setIssues(detectedIssues);
//     } catch (error) {
//       console.error("Error comparing data:", error);
//     }
//   };

//   return (
//     <div className="p-4 flex flex-col h-screen overflow-hidden">
//       <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white p-2 shadow">Data Cleaning</h2>
//       <input
//         type="text"
//         placeholder="Search..."
//         className="border p-2 w-full mb-4"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {/* Removed Data Table */}
//       <div className="flex-1 overflow-hidden border p-4 rounded shadow bg-white">
//         <h3 className="text-lg font-bold sticky top-0 bg-white p-2 shadow">Removed Data</h3>
//         <div className="overflow-auto h-96">
//           {removedData.length > 0 ? (
//             <table className="w-full border-collapse border border-gray-300">
//               <thead className="sticky top-0 bg-gray-200">
//                 <tr>
//                   <th className="border p-2">Location</th>
//                   <th className="border p-2">Temperature</th>
//                   <th className="border p-2">Humidity</th>
//                   <th className="border p-2">Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {removedData.map((row, index) => (
//                   <tr key={index} className="border text-red-500">
//                     <td className="border p-2">{row.Location}</td>
//                     <td className="border p-2">{row.Temperature}</td>
//                     <td className="border p-2">{row.Humidity}</td>
//                     <td className="border p-2">{row.Reason}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-green-600 flex items-center">
//               <FaCheck className="mr-2" /> No data was removed.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Detected Issues */}
//       <div className="mt-4 p-4 border rounded shadow bg-white">
//         <h3 className="text-lg font-bold sticky top-0 bg-white p-2 shadow">Detected Issues</h3>
//         <div className="overflow-auto h-40">
//           {issues.length > 0 ? (
//             <ul className="list-disc pl-5">
//               {issues.map((issue, idx) => (
//                 <li key={idx} className="text-red-500 flex items-center">
//                   <FaExclamationTriangle className="mr-2" /> Row {issue.index + 1}: {issue.field} - {issue.issue}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-green-600 flex items-center">
//               <FaCheck className="mr-2" /> No issues detected.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DataCleaning;
