import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserRoleFromToken } from "../utils/jwt";
import { getUser } from "../services/accountService";


const Sidebar = () => {
    const location = useLocation();
    const role = getUserRoleFromToken();
    const [user, setUser] = useState({ username: "", avatarUrl: "" });
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUser();
                setUser({
                    username: res.userName,
                    avatarUrl: res.avatarUrl || "",
                });
            } catch (error) {
                console.error("Failed to load user", error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 700);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            <button
                className="btn btn-light d-md-none position-fixed top-0 start-0 m-2 z-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarOffcanvas"
                aria-controls="sidebarOffcanvas"
            >
                <i className="bi bi-list fs-3"></i>
            </button>

            <div
                className={`${isSmallScreen ? "offcanvas" : "offcanvas-md"} offcanvas-start bg-light`}
                tabIndex={-1}
                id="sidebarOffcanvas"
                aria-labelledby="sidebarLabel"
                style={{ width: "250px" }}
            >
                <div className="offcanvas-header d-md-none">
                    <h5 className="offcanvas-title" id="sidebarLabel">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="d-flex flex-column vh-100">
                    <div className="d-flex align-items-center border-bottom py-4 px-3">
                        {user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="Avatar"
                                className="rounded-circle"
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                        ) : (
                            <div
                                className="bg-secondary rounded-circle"
                                style={{ width: "60px", height: "60px" }}
                            />
                        )}
                        <div className="fw-bold ms-3">{user.username}</div>
                    </div>

                    <div className="p-3 flex-grow-1 overflow-auto">
                        <ul className="nav flex-column">
                            <li
                                className="nav-item"
                                style={isActive("/admin/dashboard") ? { backgroundColor: "#E9F5FE", borderRadius: "4px" } : {}}
                            >
                                <Link
                                    to="/admin/dashboard"
                                    className={`nav-link d-flex align-items-center gap-2 ${isActive("/admin/dashboard") ? "active text-primary fw-bold" : "text-dark"}`}
                                >
                                    <i className={`bi bi-house fs-4 ${isActive("/admin/dashboard") ? "text-primary" : "text-secondary"}`}></i>
                                    Dashboard
                                </Link>
                            </li>

                            {/*{role === "5" && (*/}
                            <li
                                className="nav-item"
                                style={isActive("/admin/userList") ? { backgroundColor: "#E9F5FE", borderRadius: "4px" } : {}}
                            >
                                <Link
                                    to="/admin/userList"
                                    className={`nav-link d-flex align-items-center gap-2 ${isActive("/admin/userList") ? "active text-primary fw-bold" : "text-dark"}`}
                                >
                                    <i className={`bi bi-person-rolodex fs-4 ${isActive("/admin/userList") ? "text-primary" : "text-secondary"}`}></i>
                                    User Management
                                </Link>
                            </li>
                            {/*)}*/}

                            {/*{role === "2" && (*/}
                            <li
                                className="nav-item"
                                style={isActive("/admin/reports") ? { backgroundColor: "#E9F5FE", borderRadius: "4px" } : {}}
                            >
                                <Link
                                    to="/admin/reports"
                                    className={`nav-link d-flex align-items-center gap-2 ${isActive("/admin/reports") ? "active text-primary fw-bold" : "text-dark"}`}
                                >
                                    <i className={`bi bi-pencil-square fs-4 ${isActive("/admin/reports") ? "text-primary" : "text-secondary"}`}></i>
                                    Reports
                                </Link>
                            </li>
                            {/*)}*/}
                            {/*{role === "5" && (*/}
                            <li
                                className="nav-item"
                                style={isActive("/admin/cases") ? { backgroundColor: "#E9F5FE", borderRadius: "4px" } : {}}
                            >
                                <Link
                                    to="/admin/cases"
                                    className={`nav-link d-flex align-items-center gap-2 ${isActive("/admin/cases") ? "active text-primary fw-bold" : "text-dark"}`}
                                >
                                    <i className={`bi bi-journal-text fs-4 ${isActive("/admin/cases") ? "text-primary" : "text-secondary"}`}></i>
                                    Cases
                                </Link>
                            </li>
                            {/*)}*/}

                            {/*{role === "5" && (*/}
                            <li
                                className="nav-item"
                                style={isActive("/admin/supervise") ? { backgroundColor: "#E9F5FE", borderRadius: "4px" } : {}}
                            >
                                <Link
                                    to="/admin/supervise"
                                    className={`nav-link d-flex align-items-center gap-2 ${isActive("/admin/supervise") ? "active text-primary fw-bold" : "text-dark"}`}
                                >
                                    <i className={`bi bi-eye fs-4 ${isActive("/admin/supervise") ? "text-primary" : "text-secondary"}`}></i>
                                    Supervise
                                </Link>
                            </li>
                            {/*)}*/}
                        </ul>
                    </div>

                    <div className="p-3 border-top">
                        <button
                            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/Auth/login";
                            }}
                        >
                            <i className="bi bi-box-arrow-right fs-4"></i>
                            <span className="fw-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
