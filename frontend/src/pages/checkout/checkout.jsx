


import React, { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const handlePayment = async () => {
    if (!address.trim()) return toast.warn("Please enter delivery address");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/checkout/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cart.map((item) => ({
              productId: item.product._id,
              title: item.product.title,
              price: item.product.price,
              qty: item.qty,
              image: item.product.image,
              description: item.product.description,
            })),
            address,
            note,
            paymentMethod,
            totalAmount: total,
            userId: user?._id,
          }),
        }
      );

      const data = await response.json();

      if (paymentMethod === "Stripe" && data.url) {
        window.location.href = data.url;
      } else if (data.success) {
        
        toast.success("🎉 Order placed successfully!");
        clearCart(); 

        setTimeout(() => navigate("/yourorders"), 500);
      } else {
        toast.error("❌ Order failed, please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Checkout 🧾</h1>

        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 rounded-md object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} × {item.qty}
                  </p>
                </div>
              </div>
              <p className="font-medium text-gray-700">
                ${(item.product.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Total: ${total.toFixed(2)}
        </h3>

        <textarea
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-lg p-3 mb-3 focus:ring focus:ring-blue-300"
        />
        <textarea
          placeholder="Order note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded-lg p-3 mb-3 focus:ring focus:ring-blue-300"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value="COD">Mock Checkout (No Stripe)</option>
          <option value="Stripe">Stripe Payment</option>
        </select>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
