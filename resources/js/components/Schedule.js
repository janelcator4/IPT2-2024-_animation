import React from "react";
import { useUser } from "./UserContext"; // Import the useUser hook
import DashboardSide from "./DashboardSide";
import DashboardNav from "./DashboardNav";

export default function Schedule() {
    const user = useUser(); // Get user from context

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
                    <h1 className="text-center">Schedule</h1> {/* Centered title for consistency */}

                    <div className="mt-4">
                        <h3 className="text-muted">Upcoming Events:</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Event 1: Project Meeting - October 10, 2024</li>
                            <li className="list-group-item">Event 2: Team Building Activity - October 15, 2024</li>
                            <li className="list-group-item">Event 3: Code Review - October 20, 2024</li>
                            <li className="list-group-item">Event 4: Release Planning - October 25, 2024</li>
                            <li className="list-group-item">Event 5: Demo Day - October 30, 2024</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
