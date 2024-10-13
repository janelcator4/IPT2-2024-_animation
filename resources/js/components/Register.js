import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext"; 

export default function Register() {
    const { setUser } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        const fetchCSRFToken = async () => {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        };

        fetchCSRFToken();

        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                },
                {
                    withCredentials: true,
                }
            );

            const { user, token } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            setSuccessMessage("Registration successful!");

            if (user.role === 1) {
                navigate("/admindashboard");
            } else {
                navigate("/studentprofile");
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
        <div className="d-flex hero  justify-content-center align-items-center vh-100">
            <div className=" mx-2 card shadow-lg" style={{ maxWidth: "900px", width: "100%" }}>
                <div className="row g-0">
                    {/* Left side with image */}
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src="https://via.placeholder.com/450" // Replace with an actual image URL
                            alt="register illustration"
                            className="img-fluid rounded-start"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Right side with registration form */}
                    <div className="col-md-6 p-4">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center mb-4">Register</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
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
                                    type={showPassword ? "text" : "password"}
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
                                    type={showPassword ? "text" : "password"}
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
            </div>
        </div>
    );
}
