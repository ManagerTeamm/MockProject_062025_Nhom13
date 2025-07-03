import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userService';
import Sidebar from '../../components/sidebar';
import { getRoleLabel } from '../../utils/roleHelper';
import '../../styles/investigation.css';

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

    return (
        <div className="investigation-container">
            <Sidebar />
            <main className="investigation-main">
                <header className="investigation-header">
                    <h1>User Management</h1>
                </header>
                <section className="section">
                    <div className="section-box">
                        <div className="section-title-row">
                            <span>USER LIST</span>
                        </div>
                        <div className="table-responsive">
                            <table className="info-table">
                                <thead>
                                    <tr>
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
                                        <tr key={index}>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{getRoleLabel(user.roleId)}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleViewDetail(user)}
                                                    title="View Detail"
                                                >
                                                    <img src="/icons/Create.svg" alt="view" className="icon-create" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserList;
