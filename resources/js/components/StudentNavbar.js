import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; 
import axios from "axios"; 

export default function StudentNavbar() {
    const { user, setUser } = useUser(); 
    const navigate = useNavigate(); 
    const isMounted = useRef(true); 
    const [errorMessage, setErrorMessage] = useState(""); 

    useEffect(() => {
        return () => {
            isMounted.current = false; 
        };
    }, []);

    const handleLogout = async () => {
        setErrorMessage(""); 
        try {
            
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

            
            const token = localStorage.getItem("token");
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            
            setUser(null);
            localStorage.removeItem("token");

            if (isMounted.current) {
                navigate("/"); 
            }
        } catch (error) {
            if (isMounted.current) {
                console.error("Logout failed:", error);
                setErrorMessage("Logout failed. Please try again."); 
            }
        }
    };

    return (
        <>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-none d-lg-block">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/studentprofile">
                        FSUU
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/studentprofile">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/enlistment">
                                    Enlistment
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/schedule">
                                    Schedule
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger ms-2" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Offcanvas Menu for smaller screens */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-lg-none">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/studentprofile">
                        FSUU
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasStudentNavbar"
                        aria-controls="offcanvasStudentNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            <div
                className="offcanvas offcanvas-end text-bg-dark"
                tabIndex="-1"
                id="offcanvasStudentNavbar"
                aria-labelledby="offcanvasStudentNavbarLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasStudentNavbarLabel">
                        FSUU
                    </h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav flex-grow-1 pe-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/studentprofile">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/enlistment">
                                Enlistment
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/schedule">
                                Schedule
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger w-100 mb-2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
