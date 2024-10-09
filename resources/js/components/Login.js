import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useUser } from "./UserContext"; // Importing UserContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    const { setUser } = useUser(); // Use context to set user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // Load email from localStorage if "Remember Me" was checked
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic form validation
        if (!email || !password) {
            setError("Both email and password are required.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                { email, password }
            );
            if (response.data.access_token && response.data.user) {
                // Set user in context
                setUser(response.data.user);

                // Store the token in localStorage and set it for future requests
                localStorage.setItem("token", response.data.access_token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

                // Handle Remember Me functionality
                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                } else {
                    localStorage.removeItem("rememberedEmail");
                }

                // Clear form fields
                setEmail("");
                setPassword("");

                // Redirect based on user role with fallback route
                if (response.data.user.role === "admin") {
                    navigate("/admindashboard"); // Admin dashboard
                } else if (response.data.user.role === "user") {
                    navigate("/dashboard"); // Regular user dashboard
                } else {
                    navigate("/"); // Fallback route
                }
            } else {
                setError("Unexpected response from server.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError("Incorrect email or password. Please try again.");
                } else if (error.response.status === 422) {
                    setError("Validation failed. Please check your input.");
                } else {
                    setError("Server error. Please try again later.");
                }
            } else {
                setError("Network error. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            setError("");
            setLoading(false);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div
                className="container-lg mt-5 shadow p-4 card"
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <form onSubmit={handleSubmit} className="px-4 py-3">
                    <h2 className="text-center">Login</h2>

                    {error && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            aria-live="assertive"
                        >
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading} // Disable while loading
                        />
                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading} // Disable while loading
                        />
                        <span
                            className="position-absolute"
                            style={{
                                right: "10px",
                                top: "38px",
                                cursor: "pointer",
                                fontSize: "1.2em",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                            />
                        </span>
                    </div>

                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            disabled={loading} // Disable while loading
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                        >
                            Remember Me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <span>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>{" "}
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="mt-3 text-center">
                        <p>
                            Don't have an account?{" "}
                            <a href="/register" className="text-primary">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
