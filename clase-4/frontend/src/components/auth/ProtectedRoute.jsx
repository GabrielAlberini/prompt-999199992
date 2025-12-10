import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user")

  return user === "conectado" ? children : <Navigate to="/" replace />;
};

export { ProtectedRoute }