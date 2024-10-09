import React from "react";
import StudentNavbar from "./StudentNavbar";
import { useUser } from "./UserContext"; // Import the useUser hook

export default function StudentProfile() {
    const { user } = useUser() || {}; // Get user info from context
    const { id, name, email } = user || {}; // Destructure user details

    return (
        <div className="student-profile-container">
            <StudentNavbar />
            <header className="text-center py-5 bg-primary text-white">
                <h1 className="display-4">Welcome, {name || "User"}!</h1>
            </header>
            <section className="student-details py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Your Profile Information</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Personal Information</h3>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong>ID:</strong> {id || "N/A"}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Name:</strong> {name || "N/A"}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Email:</strong> {email || "N/A"}
                                        </li>
                                        {/* You can also include course and yearLevel here if needed */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
