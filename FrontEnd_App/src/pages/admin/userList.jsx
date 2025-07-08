import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import Sidebar from '../../components/sidebar';
import { getRoleLabel } from '../../utils/roleHelper';
import User from '../../models/user';
import UserForm from '../../components/userForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        }
    };

    const handleCreateUser = async (userData) => {
        try {
            await createUser(userData);
            await fetchUsers();
        } catch (err) {
            console.error("Failed to create user:", err);
        }
    };

    const handleEditUser = async (userData) => {
        try {
            await updateUser(userData);
            await fetchUsers();
            setSelectedUser(null);
        } catch (err) {
            console.error("Failed to update user:", err);
        }
    };

    const handleDeleteUser = async (username) => {
        try {
            await deleteUser(username);
            await fetchUsers();
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
            <div className="d-flex">
                {/* Sidebar cố định 250px */}
                <div className="bg-light border-end min-vh-100" style={{ width: "250px" }}>
                    <Sidebar />
                </div>

                {/* Main content chiếm phần còn lại */}
                <div className="flex-grow-1 py-4 px-5" style={{ backgroundColor: "#667A8A", minHeight: "100vh" }}>
                    <div className="card shadow-sm mb-4">
                        <div className="card-body text-center">
                            <h2 className="mb-0">User Management</h2>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mb-3">
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#createUserModal"
                        >
                            + Create New User
                        </button>
                    </div>

                    <div className="table-responsive">
                    <table className="table table-striped table-hover">
                            <thead>
                                <tr style={{ backgroundColor: "#E9F5FE" }}>
                                    <th>UserName</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} style={{
                                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#F4F6F8",
                                    }}>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{getRoleLabel(user.roleId)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editUserModal"
                                                onClick={() => {
                                                    const userDto = User(user);
                                                    setSelectedUser(userDto);
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Create Modal */}
                    <div className="modal fade" id="createUserModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <UserForm onSubmit={handleCreateUser} />
                            </div>
                        </div>
                    </div>

                    {/* Edit Modal */}
                    <div className="modal fade" id="editUserModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                {selectedUser && (
                                    <UserForm
                                        mode="edit"
                                        initialData={selectedUser}
                                        onSubmit={handleEditUser}
                                        onDelete={handleDeleteUser}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default UserList;
