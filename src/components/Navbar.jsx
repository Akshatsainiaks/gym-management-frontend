import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center">
            <h1 className="text-4xl m-4 font-serif ">WELLNESS GYM CHAIN</h1>
            <div>
                <Link to="/" className="mr-4">Home</Link>
                {token ? (
                    <>
                        <Link to="/dashboard" className="mr-4">Dashboard</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="mr-4">Register</Link>
                        <Link to="/" className="bg-green-500 px-3 py-1 rounded">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
