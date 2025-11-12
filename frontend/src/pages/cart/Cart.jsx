

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Cart = () => {
  const { cart, updateQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (!user) navigate("/login");
    else navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-10 tracking-wide font-[Poppins]">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-8">
          Your cart is empty 😢
        </p>
      ) : (
        <>
          <div className="space-y-6 max-w-4xl mx-auto">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <img
                  src={
                    item.product.image ||
                    "https://via.placeholder.com/300x400.png?text=Product+Image"
                  }
                  alt={item.product.title}
                  className="w-32 h-32 object-contain rounded-lg mb-4 sm:mb-0 sm:mr-6 bg-gray-100"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
                    {item.product.title}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-2">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => updateQty(item.product._id, item.qty - 1)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-gray-700 font-medium">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.product._id, item.qty + 1)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Total:{" "}
              <span className="text-indigo-600">${total.toFixed(2)}</span>
            </h2>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors w-full sm:w-auto"
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
