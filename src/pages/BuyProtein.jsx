import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // QR Code Support

const BuyProtein = () => {
    const navigate = useNavigate();
    const [selectedProtein, setSelectedProtein] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isPurchased, setIsPurchased] = useState(false);

    // 🏋️ List of Protein Products
    const proteinProducts = [
        { id: 1, name: "Whey Protein (1kg)", price: 2000 },
        { id: 2, name: "Plant Protein (1kg)", price: 1800 },
        { id: 3, name: "Mass Gainer (2kg)", price: 3000 },
    ];

    const handlePurchase = () => {
        if (!selectedProtein || !paymentMethod) {
            alert("❌ Please select a product and payment method!");
            return;
        }
        setIsPurchased(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800">Buy Protein Supplements</h2>

                {/* ✅ Show Confirmation after Purchase */}
                {isPurchased ? (
                    <div className="text-center mt-6">
                        <p className="text-lg font-semibold text-green-600">🎉 Purchase Successful!</p>
                        <p className="text-gray-600">You have purchased: {selectedProtein.name}</p>
                        <p className="text-gray-600">Amount Paid: ₹{selectedProtein.price}</p>
                        <button 
                            onClick={() => navigate("/dashboard")}
                            className="mt-4 bg-blue-600 text-white p-2 rounded-md"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* 🏋️ Select Protein Product */}
                        <h3 className="text-lg font-semibold mt-4">Choose a Supplement</h3>
                        {proteinProducts.map((protein) => (
                            <div key={protein.id} className="flex items-center justify-between p-2 border rounded-md mt-2">
                                <span>{protein.name}</span>
                                <span className="font-semibold">₹{protein.price}</span>
                                <button
                                    className={`p-2 rounded-md text-white ${
                                        selectedProtein?.id === protein.id ? "bg-green-600" : "bg-blue-600"
                                    }`}
                                    onClick={() => setSelectedProtein(protein)}
                                >
                                    Select
                                </button>
                            </div>
                        ))}

                        {/* 💳 Select Payment Method */}
                        <h3 className="text-lg font-semibold mt-4">Choose Payment Method</h3>
                        <select
                            className="w-full p-2 border rounded-md mt-2"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            value={paymentMethod}
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="QR Code">QR Code</option>
                        </select>

                        {/* 📌 QR Code for Payment */}
                        {paymentMethod === "QR Code" && selectedProtein && (
                            <div className="flex justify-center mt-4">
                                <QRCodeCanvas 
                                    value={`Payment for ${selectedProtein.name} - ₹${selectedProtein.price}`} 
                                    size={150} 
                                />
                            </div>
                        )}

                        {/* 🛒 Buy Button */}
                        <button
                            onClick={handlePurchase}
                            className="w-full bg-blue-600 text-white p-2 rounded-md mt-4"
                        >
                            Buy Now
                        </button>

                        {/* 🔙 Back Button */}
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full bg-gray-600 text-white p-2 rounded-md mt-2"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyProtein;
