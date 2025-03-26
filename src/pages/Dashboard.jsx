import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [attendance, setAttendance] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!userId || !token) {
            navigate("/");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setAttendance(response.data.attendance || 0);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [userId, navigate, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            {/* Background Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900 via-black to-gray-900 opacity-40 blur-3xl"></div>

            <h2 className="text-5xl font-extrabold mb-8 text-center text-red-500 tracking-wider shadow-lg">
                🏋️‍♂️ Gym Dashboard
            </h2>

            <div className="relative bg-black bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-600 max-w-md w-full transition-all hover:scale-105 hover:border-red-500">
                {user ? (
                    <div className="text-center">
                        <p className="text-2xl font-semibold text-yellow-300 animate-fade-in">Welcome, {user.name}! 🎉</p>
                        <p className="text-gray-300">{user.email}</p>

                        {/* Membership Details */}
                        <div className="mt-6 text-lg">
                            <p className="text-green-400 font-semibold">
                                Membership Status: {user.membership ? "Active ✅" : "Not Active ❌"}
                            </p>
                            <p className="mt-2 text-yellow-400 font-semibold">
                                🏆 Attendance: {attendance} Days
                            </p>
                        </div>

                        {/* Buy Protein Button */}
                        <button
                            onClick={() => navigate("/buy-protein")}
                            className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-full text-lg transition-all duration-300 hover:from-yellow-600 hover:to-orange-600 hover:scale-110 shadow-md hover:shadow-xl"
                        >
                            🛒 Buy Protein
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-400 mt-4">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
