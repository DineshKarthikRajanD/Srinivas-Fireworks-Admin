import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://srinivas-fireworks-backend.onrender.com/api/admin/order")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        All Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <Link
                to={`/admin/orders/${order._id}`}
                className="text-blue-600 hover:underline"
              >
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {order.name} - {order.phone}
                </h3>
              </Link>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Address:</span> {order.address}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Total Items:</span>{" "}
                {order.items.length}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Payment Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    order.payment ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.payment ? order.payment.status : "Not Paid"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrdersPage;
