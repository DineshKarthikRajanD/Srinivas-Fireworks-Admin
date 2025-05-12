import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SalesReport = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get(
          "https://srinivas-fireworks-backend.onrender.com/api/admin/getreport"
        );
        setSalesData(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error fetching sales report.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesReport();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  const { mostSoldCracker, totalRevenue, totalUnitsSold, salesByCracker } =
    salesData;
  const safeSalesByCracker = salesByCracker || [];

  // Pie Chart Data for Most Sold Cracker
  const pieData = {
    labels: safeSalesByCracker.map((cracker) => cracker.name),
    datasets: [
      {
        data: safeSalesByCracker.map((cracker) => cracker.totalSold),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#ff9f40",
        ],
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#ff9f40",
        ],
      },
    ],
  };

  // Bar Chart Data for Revenue by Cracker
  const barData = {
    labels: safeSalesByCracker.map((cracker) => cracker.name),
    datasets: [
      {
        label: "Revenue (₹)",
        data: safeSalesByCracker.map((cracker) => cracker.revenue),
        backgroundColor: "#4bc0c0",
        borderColor: "#36a2eb",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Sales Report</h1>

      {/* Most Sold Cracker */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Most Sold Cracker</h2>
        {mostSoldCracker ? (
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <img
              className="w-32 h-32 object-cover rounded-full mr-6"
              src={mostSoldCracker.image}
              alt={mostSoldCracker.name}
            />
            <div>
              <h3 className="text-xl font-semibold">{mostSoldCracker.name}</h3>
              <p className="text-sm text-gray-600">
                Type: {mostSoldCracker.type}
              </p>
              <p className="text-sm text-gray-600">
                Total Sold: {mostSoldCracker.totalSold}
              </p>
              <p className="text-sm text-gray-600">
                Revenue: ₹{mostSoldCracker.revenue}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">No data available</p>
        )}
      </div>

      {/* Total Revenue and Units Sold */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Sales</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg">Total Revenue: ₹{totalRevenue}</p>
          <p className="text-lg">Total Units Sold: {totalUnitsSold}</p>
        </div>
      </div>

      {/* Sales by Cracker */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sales by Cracker</h2>
        {safeSalesByCracker.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No crackers sold.</p>
        ) : (
          <ul className="space-y-4">
            {safeSalesByCracker.map((cracker) => (
              <li
                key={cracker.name}
                className="bg-white shadow-lg rounded-lg p-6 flex items-center"
              >
                <img
                  className="w-24 h-24 object-cover rounded-full mr-6"
                  src={cracker.image}
                  alt={cracker.name}
                />
                <div>
                  <h3 className="text-xl font-semibold">{cracker.name}</h3>
                  <p className="text-sm text-gray-600">Type: {cracker.type}</p>
                  <p className="text-sm text-gray-600">
                    Total Sold: {cracker.totalSold}
                  </p>
                  <p className="text-sm text-gray-600">
                    Revenue: ₹{cracker.revenue}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Sales Distribution by Cracker
        </h3>
        <div className="mx-auto" style={{ width: "250px", height: "250px" }}>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Revenue by Cracker</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default SalesReport;
