import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext"; 
import DashboardSide from "./DashboardSide";
import DashboardNav from "./DashboardNav";

export default function UserList() {
    const { user } = useUser(); 
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // Fetch all users from the database
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users");
    
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
    
                const result = await response.json();
    
                // Check for 'success' flag
                if (result.success) {
                    setUsers(result.data); // Set users if the response is successful
                } else {
                    throw new Error("Invalid response from server");
                }
            } catch (err) {
                setError(err.message); // Set error state
            } finally {
                setLoading(false); // Set loading to false
            }
        };
    
        fetchUsers();
    }, []);
    

    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            {/* Sidebar */}
            <div style={{ width: "250px" }}>
                <DashboardSide user={user} />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Navbar */}
                <DashboardNav user={user} />

                {/* Content Area */}
                <div className="container p-4 flex-grow-1">
                    <h1 className="text-center">User List</h1> 

                    {/* Loading or Error State */}
                    {loading && <p className="text-center">Loading users...</p>}
                    {error && <p className="text-danger text-center">{error}</p>}

                    {/* User List */}
                    {!loading && !error && users.length === 0 && (
                        <p className="text-center">No users found.</p>
                    )}
                    {users.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-muted">All Users:</h3>
                            <ul className="list-group shadow">
                                {users.map((user) => (
                                    <li key={user.id} className="list-group-item">
                                        <strong>ID:</strong> {user.id} <br />
                                        <strong>Name:</strong> {user.name} <br />
                                        <strong>Email:</strong> {user.email} <br />
                                        <strong>Role:</strong> {user.role} <br />
                                        <strong>Account Created:</strong>{" "}
                                        {new Date(user.created_at).toLocaleDateString()} <br />
                                        <strong>Last Updated:</strong>{" "}
                                        {new Date(user.updated_at).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
