import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [attendance, setAttendance] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const membershipPlans = [
        { id: 1, name: "Monthly Plan", price: 500 },
        { id: 2, name: "Quarterly Plan", price: 1200 },
        { id: 3, name: "Yearly Plan", price: 4000 },
    ];

    useEffect(() => {
        if (!userId || !token) {
            navigate("/");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/user/${userId}`, {
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

    const buyMembership = async () => {
        if (!selectedPlan || !paymentMethod) {
            alert("❌ Please select a plan and payment method!");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5002/buy-membership/${userId}`,
                { plan: selectedPlan, paymentMethod },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                alert("🎉 Membership purchased successfully!");
                setUser({
                    ...user,
                    membership: true,
                    paymentDetails: response.data.paymentDetails,
                });
            } else {
                alert("❌ Payment failed!");
            }
        } catch (error) {
            console.error("Error purchasing membership:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full border border-red-600">
                <h2 className="text-3xl font-bold text-center text-red-500">🏋️ Gym Dashboard</h2>

                {user ? (
                    <div className="mt-6 text-center">
                        <p className="text-xl font-semibold">Welcome, {user.name}! 🎉</p>
                        <p className="text-gray-400">{user.email}</p>

                        <p className="mt-4 text-lg">
                            Membership Status:{" "}
                            {user.membership ? (
                                <span className="text-green-400 font-semibold">Active ✅</span>
                            ) : (
                                <span className="text-red-400 font-semibold">Not Active ❌</span>
                            )}
                        </p>

                        <p className="mt-2 text-lg">🏆 Attendance: {attendance} Days</p>

                        {user.membership && user.paymentDetails && (
                            <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-200">
                                <h3 className="text-lg font-semibold">Payment Details</h3>
                                <p>💳 Plan: {user.paymentDetails.plan}</p>
                                <p>💰 Amount: ₹{user.paymentDetails.amount}</p>
                                <p>📅 Date: {new Date(user.paymentDetails.date).toDateString()}</p>
                            </div>
                        )}

                        {!user.membership && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">🏋️ Choose Membership Plan</h3>
                                <div className="space-y-2">
                                    {membershipPlans.map((plan) => (
                                        <div
                                            key={plan.id}
                                            className={`p-4 border rounded-md flex justify-between items-center transition duration-300 ${
                                                selectedPlan === plan.name ? "border-red-500 bg-gray-700" : "border-gray-600"
                                            }`}
                                            onClick={() => setSelectedPlan(plan.name)}
                                        >
                                            <span>{plan.name}</span>
                                            <span className="font-bold">₹{plan.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-lg font-semibold mt-4">💳 Payment Method</h3>
                                <select
                                    className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    value={paymentMethod}
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Net Banking">Net Banking</option>
                                    <option value="QR Code">QR Code</option>
                                </select>

                                {paymentMethod === "QR Code" && (
                                    <div className="flex flex-col items-center mt-4">
                                        <p className="text-sm text-gray-400">Scan QR to Pay</p>
                                        <QRCodeCanvas value={`Payment for ${selectedPlan} - ₹${membershipPlans.find(p => p.name === selectedPlan)?.price}`} size={150} />
                                    </div>
                                )}

                                <button
                                    onClick={buyMembership}
                                    className="w-full bg-red-600 text-white p-3 rounded-md mt-4 hover:bg-red-700 transition-all"
                                >
                                    Buy Membership
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => navigate("/buy-protein")}
                            className="w-full bg-orange-500 text-white p-3 rounded-md mt-4 hover:bg-orange-600 transition-all"
                        >
                            🛒 Buy Protein Supplements
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
