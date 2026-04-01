import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthWrapper({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  return user ? children : <Navigate to="/login" />;
}

export default AuthWrapper;
