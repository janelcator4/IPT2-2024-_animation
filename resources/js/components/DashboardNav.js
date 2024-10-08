import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function DashboardNav() {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate("/login"); // Redirect to the login page

        
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
            <div className="container-fluid ">
                {/* Move the toggler button to the right by using the 'ms-auto' class */}
                <button
                    className="navbar-toggler mb-3 ms-auto" // Added ms-auto to align to the right
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarNav">
                    <div className="ms-auto  d-flex align-items-center justify-content-end">
                        <div className="dropdown">
                            <a
                                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="text-nowrap me-2">{user ? user.name : "Guest"}</span>
                                <img
                                    src={user?.profilePicture || "/profile.jpg"} // Use optional chaining and fallback
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
