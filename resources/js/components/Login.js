import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    let isMounted = true;

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        const getCsrfToken = async () => {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        };

        getCsrfToken();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

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

            if (isMounted && response.data.access_token && response.data.user) {
                setUser(response.data.user);
                localStorage.setItem("token", response.data.access_token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.access_token}`;

                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                } else {
                    localStorage.removeItem("rememberedEmail");
                }

                setEmail("");
                setPassword("");

                if (response.data.user.role === 1) {
                    navigate("/admindashboard");
                } else if (response.data.user.role === 0) {
                    navigate("/studentprofile");
                } else {
                    setError("Unauthorized role.");
                }
            } else {
                setError("Unexpected response from server.");
            }
        } catch (error) {
            if (isMounted) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setError(
                            "Incorrect email or password. Please try again."
                        );
                    } else if (error.response.status === 422) {
                        setError("Validation failed. Please check your input.");
                    } else {
                        setError("Server error. Please try again later.");
                    }
                } else {
                    setError("Network error. Please check your connection.");
                }
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="d-flex hero  justify-content-center align-items-center vh-100">
            <div className="card mx-2 z-index-1 shadow-lg" style={{ maxWidth: "900px", width: "100%" }}>
                <div className="row  g-0">
                    {/* Left side with image */}
                    <div className="img col-md-6 d-none d-md-block">
                        <img
                            src="/fsuu2.png" // Replace with an actual image URL
                            alt="login illustration"
                            className="rounded-start img-fluid"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Right side with login form */}
                    <div className="col-md-6 p-4">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center mb-4">Login</h2>

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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                disabled={loading}
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
            </div>
        </div>
    );
}
