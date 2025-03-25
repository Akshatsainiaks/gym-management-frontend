import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const Membership = () => {
    const navigate = useNavigate();

    const handlePayment = async () => {
        const userId = localStorage.getItem("userId");
        await axios.post("http://localhost:5000/buy-membership", { userId });
        alert("Payment successful! Membership activated.");
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800">Activate Membership</h2>
                <p className="text-gray-500 text-center">Unlock premium features 🏋️</p>

                <div className="mt-4 p-4 border rounded-lg text-center">
                    <p className="text-lg font-semibold">Price: ₹999</p>
                    <p className="text-gray-500 text-sm">Lifetime Access</p>
                </div>

                <button 
                    onClick={handlePayment} 
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Pay ₹999 & Activate
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default Membership;
