import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // ✅ Fix: Token check ho raha hai
    return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
