import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "axios"; // Make sure to import axios

export default function DashboardNav() {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = async () => {
        try {
            // Make an API call to logout
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Call the logout function from context to clear user data and token
            logout();
            // Redirect to the login page
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow">
            <div className="container-fluid ">
                {/* Toggler button for mobile view */}
                <button
                    className="navbar-toggler mb-3 ms-auto"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="ms-auto d-flex align-items-center justify-content-end">
                        <div className="dropdown">
                            <a
                                className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="name text-nowrap me-2">{user ? user.name : "Guest"}</span>
                                <img
                                    src={user?.profilePicture || "/profile.jpg"}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <button
                                        className="dropdown-item logout-button"
                                        onClick={handleLogout}
                                        aria-label="Logout"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
