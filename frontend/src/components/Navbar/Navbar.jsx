


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import crown from "../../assets/crown.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0); // total qty count

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={crown} alt="Logo" className="h-10 w-auto" />
        </Link>
        <h1 className="text-xl font-bold text-indigo-700 hidden sm:block">
          
        </h1>
      </div>

      {/* Mobile menu button */}
      <div
        className="sm:hidden flex flex-col gap-[5px] cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`block w-6 h-[2px] bg-gray-800 transition-all ${
            menuOpen ? "rotate-45 translate-y-[6px]" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-[2px] bg-gray-800 transition-all ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-[2px] bg-gray-800 transition-all ${
            menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
        ></span>
      </div>

      {/* Nav links */}
      <div
        className={`flex-col sm:flex-row sm:flex items-center gap-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent p-5 sm:p-0 transition-all duration-300 ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <Link
          to="/shop"
          onClick={() => setMenuOpen(false)}
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          SHOP
        </Link>

        {user && (
          <Link
            to="/yourorders"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            ORDERS
          </Link>
        )}

        {!user ? (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            SIGN IN
          </Link>
        ) : (
          <>
            <span className="text-gray-700 font-semibold">
              Hi, {user.name}
            </span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </>
        )}

        {/* 🛒 Cart Icon with badge */}
        <Link
          to="/cart"
          onClick={() => setMenuOpen(false)}
          className="relative text-2xl"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
