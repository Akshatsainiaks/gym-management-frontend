import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import BuyProtein from "./pages/BuyProtein"; // ✅ Import BuyProtein Component

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Dashboard Route */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                {/* ✅ Add Protein Purchase Page Route */}
                <Route path="/buy-protein" element={
                    <ProtectedRoute>
                        <BuyProtein />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
