import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSide from "./DashboardSide";
import DashboardNav from "./DashboardNav";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchUser = () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser && isMounted) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setError("User data not found. Please log in again.");
                    navigate("/login"); // Redirect to login if no user data is found
                }
            } catch (err) {
                setError("An error occurred while fetching user data.");
                console.error("Error fetching user data from localStorage", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, [navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            {/* Sidebar */}
            <div style={{ width: "250px" }}>
                <DashboardSide />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Nav Bar */}
                <DashboardNav user={user} />

                {/* Content Area */}
                <div className="container p-4 flex-grow-1 d-flex justify-content-evenly">
                    <div className="profile flex-grow-1 d-flex align-items-start">
                        <div className="w-100"> {/* Ensures full width of the card */}
                            <h2 className="text-start">Dashboard</h2>
                            <div className="mt-4">
                                <h3 className="text-muted">Account Information</h3>
                                <div className="d-flex flex-column bg-light p-4 rounded shadow flex-grow-1">
                                    <div className="mb-3">
                                        <strong>ID:</strong> {user ? user.id : "Loading..."}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Name:</strong> {user ? user.name : "Loading..."}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Email:</strong> {user ? user.email : "Loading..."}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Password:</strong> ******** (hidden for security)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
