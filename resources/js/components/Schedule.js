import React from "react";
import { useUser } from "./UserContext"; // Import the useUser hook
import Navbar from "./StudentNavbar"; // Import the Navbar component

export default function Schedule() {
    const user = useUser(); // Get user from context

    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
            {/* Navbar */}
            <Navbar user={user} /> {/* Replace DashboardNav with Navbar */}
            {/* Main Content Area */}
            {/* Content Area */}
            <div className="container p-4 flex-grow-1">
                {/* Schedule Section */}
                <section className="mt-4">
                    <h3 className="text-muted">Upcoming Events:</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Event 1: Project Meeting - October 10, 2024
                        </li>
                        <li className="list-group-item">
                            Event 2: Team Building Activity - October 15, 2024
                        </li>
                        <li className="list-group-item">
                            Event 3: Code Review - October 20, 2024
                        </li>
                        <li className="list-group-item">
                            Event 4: Release Planning - October 25, 2024
                        </li>
                        <li className="list-group-item">
                            Event 5: Demo Day - October 30, 2024
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
