import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/users"); // Add route in backend
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/${id}`); // Add route in backend
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <table className="mt-4 w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Membership</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="text-center">
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.membership}</td>
                            <td className="border p-2">
                                <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
