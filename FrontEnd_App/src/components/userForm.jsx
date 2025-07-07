import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from '../models/user';
import { roleMap } from '../models/rolemap';

const UserForm = ({ onSubmit, onDelete, initialData = null, mode = "create" }) => {
    const [form, setForm] = useState(User);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm(User);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalForm = { ...form };

        if (onSubmit) {
            onSubmit(finalForm);
            console.log("Form submitted:", finalForm);
        }

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);

    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(form.userName);
        }
    };

    const handleCancel = () => {
        setForm(initialData || User);
    };

    if (!form) return null;

    return (
        <form className="modal-content px-4" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h5 className="modal-title">
                    {mode === "edit" ? "User Detail" : "Create New User"}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">
                {submitted && (
                    <div className="alert alert-success">
                        {mode === "edit" ? "User updated." : "User created."}
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        name="userName"
                        className="form-control"
                        value={form.userName}
                        onChange={handleChange}
                        required
                        disabled={mode === "edit"}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        name="fullName"
                        className="form-control"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        name="phoneNumber"
                        className="form-control"
                        value={form.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3" hidden={mode === "edit"}>
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                        required={mode === "create"}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        name="roleId"
                        className="form-select"
                        value={form.roleId}
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        {Object.entries(roleMap).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                {mode === "edit" && (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                        data-bs-dismiss="modal"
                    >
                        Delete
                    </button>
                )}
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    {mode === "edit" ? "Save Changes" : "Create"}
                </button>
            </div>
        </form>
    );
};

export default UserForm;
