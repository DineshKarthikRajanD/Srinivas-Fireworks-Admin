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
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchSalesReport = async (month = "") => {
    setLoading(true);
    setError(null);
    try {
      let url =
        "https://srinivas-fireworks-backend.onrender.com/api/admin/getreport";
      if (month) url += `?month=${month}`;
      const response = await axios.get(url);
      setSalesData(response.data);
    } catch (err) {
      setError("Error fetching sales report.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesReport(selectedMonth);
  }, [selectedMonth]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  const { mostSoldCracker, totalRevenue, totalUnitsSold, salesByCracker } =
    salesData || {};
  const safeSalesByCracker = salesByCracker || [];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        Sales Report
      </h1>

      {/* Month Filter */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <label htmlFor="month" className="text-lg font-semibold">
          Filter by Month:
        </label>
        <input
          type="month"
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Most Sold Cracker */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Most Sold Cracker</h2>
        {mostSoldCracker ? (
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center">
            <img
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6"
              src={mostSoldCracker.image}
              alt={mostSoldCracker.name}
            />
            <div className="text-center sm:text-left">
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

      {/* Totals */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Sales</h2>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-lg">Total Revenue: ₹{totalRevenue}</p>
          <p className="text-lg">Total Units Sold: {totalUnitsSold}</p>
        </div>
      </div>

      {/* Sales List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sales by Cracker</h2>
        {safeSalesByCracker.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No crackers sold.</p>
        ) : (
          <ul className="space-y-4">
            {safeSalesByCracker.map((cracker) => (
              <li
                key={cracker.name}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center"
              >
                <img
                  className="w-24 h-24 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6"
                  src={cracker.image}
                  alt={cracker.name}
                />
                <div className="text-center sm:text-left">
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Sales Distribution
          </h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Revenue by Cracker
          </h3>
          <Bar
            data={barData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
