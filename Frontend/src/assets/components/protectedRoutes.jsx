import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");

  return username && room ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
