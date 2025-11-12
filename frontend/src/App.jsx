
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/home/home.jsx";
import Shop from "./pages/Shop/shop.jsx";
import Cart from "./pages/cart/Cart.jsx"
import Login from "./pages/login/login.jsx";
import Checkout from "./pages/checkout/checkout.jsx";
import Success from "./pages/success/Success.jsx";
import YourOrders from "./pages/YourOrders/YourOrders.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart/>} />
         <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
         <Route path="/yourorders" element={<YourOrders />} />

      </Routes>
    </>
  );
}

export default App;
