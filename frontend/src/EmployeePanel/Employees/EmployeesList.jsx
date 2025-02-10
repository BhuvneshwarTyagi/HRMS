import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import { BASE_URL } from '../../Config';
import AuthContext from '../../Context/AuthContext';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {authState} = useContext(AuthContext);

    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            // Replace with your actual API endpoint
            const response = await axios.get(BASE_URL + '/fetch/user/0', {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                },
            });
            setUsers(response.data.employees);
            setIsLoading(false);
        } catch (err) {
            setError(`Failed to fetch users ${err}`);
            setIsLoading(false);
        }
    };

    // Delete user API call
    const handleDelete = async (userId) => {
        try {
            // Replace with your actual API endpoint
            await axios.delete(BASE_URL + `/update/user/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                },
            });

            // Remove user from local state
            setUsers(users.filter(user => user.id !== userId));

            // Optional: Show success toast
            alert('User deleted successfully');
        } catch (err) {
            setError('Failed to delete user');
            console.error(err);
        }
    };

    // Update user API call
    const handleSave = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.put(BASE_URL + `/update/user/${editingUser.id}`, editingUser, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                },
            });

            // Update local state
            setUsers(users.map(user =>
                user.id === editingUser.id ? response.data : user
            ));

            // Close modal
            setEditingUser(null);

            // Optional: Show success toast
            alert('User updated successfully');
        } catch (err) {
            setError('Failed to update user');
            console.error(err);
        }
    };

    // Handle input changes in edit modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Contact</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border p-2">{user.Name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.contact}</td>
                                <td className="border p-2 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-w-full">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>

                        {/* Dynamic Form Fields */}
                        {Object.keys(editingUser)
                            .filter(key =>
                                !['id', 'profile_picture', 'HR'].includes(key)
                            )
                            .map((key) => (
                                <div key={key} className="mb-4">
                                    <label className="block mb-2 capitalize">
                                        {key.replace('_', ' ')}
                                    </label>
                                    <input
                                        type={key.includes('email') ? 'email' : 'text'}
                                        name={key}
                                        value={editingUser[key] || ''}
                                        onChange={handleInputChange}
                                        className="w-full border rounded p-2"
                                    />
                                </div>
                            ))}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;