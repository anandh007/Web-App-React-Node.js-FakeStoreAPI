


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateQty } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const getCartItem = (productId) =>
    cart.find((item) => item.product._id === productId);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-10">
      <h1
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10 
        bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 
        bg-clip-text text-transparent font-['Playfair_Display'] 
        animate-fade-in"
      >
        🛍️ Our Collections
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const item = getCartItem(product._id);
          return (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
              transition-all duration-300 p-4 border border-gray-100 
              flex flex-col items-center"
            >
              <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300x400.png?text=Product+Image"
                  }
                  alt={product.title}
                  className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="text-center flex-1 flex flex-col justify-between w-full">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-indigo-600 text-lg sm:text-xl font-bold mt-2">
                  ${product.price}
                </p>

                {item ? (
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                      onClick={() => updateQty(product._id, item.qty - 1)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-gray-700 font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(product._id, item.qty + 1)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-4 bg-indigo-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors w-full sm:w-auto"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
