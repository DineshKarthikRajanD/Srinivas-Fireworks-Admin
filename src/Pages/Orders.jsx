import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://srinivas-fireworks-backend.onrender.com/api/admin/order") // ← Make sure this endpoint returns all orders
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <Link
                to={`/admin/orders/${order._id}`}
                className="text-blue-600 hover:underline"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {order.name} - {order.phone}
                </h3>
              </Link>
              <p className="text-sm mb-1">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-sm mb-1">
                <strong>Total Items:</strong> {order.items.length}
              </p>
              <p className="text-sm">
                <strong>Payment Status:</strong>{" "}
                <span
                  className={`font-medium ${
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
