import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const YourOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = user?._id || "guest"; 
    axios
      .get(`http://localhost:5000/api/orders/user/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🧾 Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
            
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3 mb-4">
                <div>
                  <p className="text-gray-800 font-semibold">
                    Order ID:{" "}
                    <span className="text-blue-600">{order._id}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

             
              <div className="space-y-4">
                {order.cartItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-3 last:border-b-0 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.qty}
                      </p>
                      <p className="text-sm text-gray-700">
                        Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-blue-600">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <p className="text-lg font-semibold text-gray-800">
                  Total:{" "}
                  <span className="text-blue-600">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </p>
                <span className="text-sm text-gray-600">
                  Payment: {order.paymentMethod}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourOrders;
