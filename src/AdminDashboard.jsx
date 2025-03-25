import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/all-users");
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleMembership = async (userId, currentStatus) => {
        try {
            await axios.post("http://localhost:5000/toggle-membership", { userId, membership: !currentStatus });
            setUsers(users.map(user => user._id === userId ? { ...user, membership: !currentStatus } : user));
        } catch (error) {
            alert("Failed to update membership.");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/delete-user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            alert("Failed to delete user.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

            <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-4">All Users</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Membership</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border">
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className={`border p-2 ${user.membership ? "text-green-600" : "text-red-600"}`}>
                                    {user.membership ? "Active" : "Inactive"}
                                </td>
                                <td className="border p-2">
                                    <button 
                                        onClick={() => handleToggleMembership(user._id, user.membership)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                                    >
                                        {user.membership ? "Deactivate" : "Activate"}
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
