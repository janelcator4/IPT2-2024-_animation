import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();
    let isMounted = true; // Flag to track if the component is mounted

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage(""); // Reset success message on new submission
        setLoading(true); // Set loading to true when the request starts

        // Basic validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false); // Reset loading on error
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            // Store token and user info in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Set success message and redirect immediately
            if (isMounted) { // Check if the component is still mounted
                setSuccessMessage("Registration successful!");
                navigate("/login"); // Redirect to login page immediately
            }

        } catch (error) {
            console.error(error); // Log error for debugging
            if (error.response && error.response.data.message) {
                if (isMounted) { // Check if the component is still mounted
                    setError(error.response.data.message);
                }
            } else {
                if (isMounted) { // Check if the component is still mounted
                    setError("An error occurred during registration");
                }
            }
        } finally {
            if (isMounted) { // Check if the component is still mounted
                setLoading(false); // Reset loading state after request completes
            }
        }
    };

    // Cleanup effect
    useEffect(() => {
        return () => {
            isMounted = false; // Set flag to false when the component unmounts
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container-lg mt-5 mb-5 shadow p-4 card" style={{ maxWidth: "400px", width: "100%" }}>
                <form onSubmit={handleSubmit} className="px-4 py-3">
                    <h2 className="text-center">Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
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
                        <label htmlFor="email" className="form-label">Email address</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5" 
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
                            id="showPasswordCheckbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPasswordCheckbox">
                            Show Password
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
