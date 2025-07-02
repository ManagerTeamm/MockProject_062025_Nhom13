// src/pages/admin/UserList.tsx
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/adminService';
import Sidebar from '../../components/sidebar';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, []);

    const handleViewDetail = (user) => {
        // Hiện modal hoặc console.log(user);
    };

    const getRoleLabel = (roleId) => {
        switch (roleId) {
            case 1: return 'Admin';
            case 2: return 'Detective';
            case 3: return 'Officer';
            case 4: return 'Moderator';
            default: return 'User';
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar chiếm 2 cột từ md trở lên */}
                <div className="col-12 col-md-3 col-lg-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-9 col-lg-10 p-4" style={{ backgroundColor: "#667A8A", minHeight: "100vh" }}>
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover mb-0">
                                    <thead>
                                        <tr style={{ backgroundColor: "#E9F5FE" }}>
                                            <th>UserName</th>
                                            <th>Email</th>
                                            <th>FullName</th>
                                            <th>PhoneNumber</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr
                                                key={index}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#F4F6F8",
                                                }}
                                            >
                                                <td>{user.userName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{getRoleLabel(user.roleId)}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => handleViewDetail(user)}
                                                    >
                                                        View Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
