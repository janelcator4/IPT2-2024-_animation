// HomeNavbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function HomeNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-none d-lg-block">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">
                        FSUU
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto  ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-primary me-2" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Offcanvas Menu for smaller screens */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-lg-none">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        FSUU
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasHomeNavbar"
                        aria-controls="offcanvasHomeNavbar"
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
                id="offcanvasHomeNavbar"
                aria-labelledby="offcanvasHomeNavbarLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasHomeNavbarLabel">FSUU</h5>
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
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-primary w-100 mb-2" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-outline-light w-100" to="/register">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
