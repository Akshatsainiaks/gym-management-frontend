import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // ✅ Error handling
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("✅ Submit button clicked", formData);

        try {
            const response = await axios.post("http://localhost:5004/api/login", formData);

            if (response.data.success) {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("token", response.data.token);
                alert("🎉 Login successful!");
                navigate("/dashboard");
            } else {
                setError("❌ Invalid credentials!");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("⚠ Error logging in! Please try again.");
        }
    };

    return (
        <div
        className="flex items-center justify-center min-h-screen relative"
        style={{
            backgroundImage: "url('/new.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
    >
    
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Login Form */}
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full z-10 border border-red-600">
                <h2 className="text-3xl font-bold text-center text-red-500">Welcome Back!</h2>
                <p className="text-center text-gray-400 mb-6">Login to your gym account 💪</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-red-500 focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-red-500 focus:outline-none"
                        required
                    />

                    {/* Show error message if login fails */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4">
                    Don't have an account?
                    <span
                        className="text-red-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        {" "}
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
