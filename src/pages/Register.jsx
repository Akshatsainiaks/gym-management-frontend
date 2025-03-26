import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(""); // ✅ Error handling added
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5004/api/register", formData);
            localStorage.setItem("userId", data.userId);
            alert("🎉 Registration successful!");
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "⚠ Error registering user!");
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen relative"
            style={{
                backgroundImage: "url('/new.jpg')", // ✅ Background image same as login
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Register Form */}
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full z-10 border border-red-600">
                <h2 className="text-3xl font-bold text-center text-red-500">Join the Gym!</h2>
                <p className="text-center text-gray-400 mb-6">Create your account and start training 💪</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-red-500 focus:outline-none"
                        required
                    />
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

                    {/* Show error message if registration fails */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-all duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4">
                    Already have an account?
                    <span
                        className="text-red-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        {" "}
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
