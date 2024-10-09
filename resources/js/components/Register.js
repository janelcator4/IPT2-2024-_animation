import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "./HomeNavbar";
import { useUser } from "./UserContext"; // Import your UserContext

export default function Register() {
    const { setUser } = useUser(); // Get setUser from context
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const navigate = useNavigate();
    const isMounted = useRef(true); // Ref to track component mounting state

    useEffect(() => {
        // Get CSRF cookie when the component mounts
        const fetchCSRFToken = async () => {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        };

        fetchCSRFToken();

        return () => {
            isMounted.current = false; // Set to false when the component unmounts
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        // Basic validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // Send registration request to the backend
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                },
                {
                    withCredentials: true, // Include credentials for CSRF protection
                }
            );

            // Assuming the backend returns user data and token
            const { user, token } = response.data; // Corrected key to 'token'

            // Store token and user info in localStorage
            localStorage.setItem("token", token); // Use 'token' instead of 'access_token'
            localStorage.setItem("user", JSON.stringify(user));

            // Set user in context
            setUser(user); // Update context with the new user

            // Set success message
            setSuccessMessage("Registration successful!");

            // Navigate based on user role
            if (user.role === 1) {
                // Admin role
                navigate("/admindashboard");
            } else {
                navigate("/studentprofile"); // Regular user
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.message) {
                if (isMounted.current) {
                    setError(error.response.data.message);
                }
            } else {
                if (isMounted.current) {
                    setError("An error occurred during registration");
                }
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <HomeNavbar />
            <div
                className="container-lg mt-5 mb-5 shadow p-4 card"
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <form onSubmit={handleSubmit} className="px-4 py-3">
                    <h2 className="text-center">Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
