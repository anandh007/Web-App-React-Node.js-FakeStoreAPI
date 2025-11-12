import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext"; 

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart(); 

  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get("orderId");

    if (orderId) {
      axios
        .post("http://localhost:5000/api/orders/mark-paid", { orderId })
        .then(() => {
          console.log("✅ Order marked as paid");
          clearCart(); 
          setTimeout(() => navigate("/yourorders"), 2000);
        })
        .catch((err) => console.error("❌ Error marking paid:", err));
    } else {
      navigate("/yourorders");
    }
  }, [location, navigate, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-600"></div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Redirecting to your orders...
        </p>
      </div>
    </div>
  );
}
