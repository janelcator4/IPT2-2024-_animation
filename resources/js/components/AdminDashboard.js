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
                    navigate("/login");
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
        <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
            {/* Sidebar */}
            <div style={{ width: "250px", flexShrink: 0 }}>
                <DashboardSide />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column" style={{ overflowY: "auto" }}>
                {/* Nav Bar */}
                <div className="dashboard-header sticky-top">
                    <DashboardNav user={user} />
                </div>

                {/* Dashboard Content */}
                <div className="container p-4 flex-grow-1">
                    <div className="row">
                        {/* Welcome Message */}
                        <div className="col-12">
                            <h2>Welcome, {user ? user.name : "Admin"}</h2>
                        </div>

                        {/* Quick Stats */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text display-4">1,234</p>
                                    <small className="text-muted">Since last week</small>
                                </div>
                            </div>
                        </div>

                        {/* Other Stats */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Active Sessions</h5>
                                    <p className="card-text display-4">342</p>
                                    <small className="text-muted">Active now</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Pending Requests</h5>
                                    <p className="card-text display-4">56</p>
                                    <small className="text-muted">Review needed</small>
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="col-md-12 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h3 className="card-title">Account Information</h3>
                                    <div className="mt-3">
                                        <strong>ID:</strong> {user ? user.id : "Loading..."}
                                    </div>
                                    <div className="mt-3">
                                        <strong>Name:</strong> {user ? user.name : "Loading..."}
                                    </div>
                                    <div className="mt-3">
                                        <strong>Email:</strong> {user ? user.email : "Loading..."}
                                    </div>
                                    <div className="mt-3">
                                        <strong>Password:</strong> ******** (hidden for security)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Activities</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong>User Registration:</strong> 3 new users registered
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Password Reset:</strong> 1 user requested a password reset
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Profile Update:</strong> 5 users updated their profile
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Support Tickets:</strong> 2 new support tickets
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Notifications</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <span className="badge bg-danger">Alert</span> System maintenance scheduled for tomorrow
                                        </li>
                                        <li className="list-group-item">
                                            <span className="badge bg-info">Info</span> New feature rollout next week
                                        </li>
                                        <li className="list-group-item">
                                            <span className="badge bg-success">Update</span> Performance improvements applied
                                        </li>
                                        <li className="list-group-item">
                                            <span className="badge bg-warning">Warning</span> Unusual login activity detected
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Content */}
                    <div className="row mt-4">
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">Quick Links</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="/users" className="text-primary">Manage Users</a>
                                        </li>
                                        <li>
                                            <a href="/reports" className="text-primary">View Reports</a>
                                        </li>
                                        <li>
                                            <a href="/settings" className="text-primary">System Settings</a>
                                        </li>
                                        <li>
                                            <a href="/support" className="text-primary">Support Requests</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* System Performance */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">System Performance</h5>
                                    <p className="card-text">Server uptime: <strong>99.9%</strong></p>
                                    <p className="card-text">Database load: <strong>Moderate</strong></p>
                                    <p className="card-text">API response time: <strong>200ms</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
