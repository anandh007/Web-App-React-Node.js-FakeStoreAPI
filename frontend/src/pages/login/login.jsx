import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "../login/login.css"; 

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const handleLogin = () => {
    login({ name: "Demo User", email: "demo@example.com" });
    navigate(redirectTo);
  };

  return (
    <div className="login-page">
      <h1>Login or Sign Up</h1>
      <p>Access your cart and checkout securely.</p>

      <button className="login-btn" onClick={handleLogin}>
        Login as Demo User
      </button>
    </div>
  );
};

export default Login;
