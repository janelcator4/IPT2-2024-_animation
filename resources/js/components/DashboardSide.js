import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboardList, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "./UserContext"; // Import UserContext to access user info

export default function DashboardSide() {
    const { user } = useUser(); // Get user info from context
    const location = useLocation(); // Get the current location

    return (
        <div
            className="d-flex flex-column flex-shrink-0 bg-dark text-white"
            style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                top: 0,
            }}
        >
            {/* Title at the top of the sidebar */}
            <h4 className="text-center fw-bold mt-4 mb-4">
                Admin Dashboard
            </h4>

            {/* Add margin to create space between the title and nav items */}
            <ul className="nav nav-pills flex-column mb-auto" style={{ flex: 1, overflowY: "auto" }}>
                <li className="mt-2 side nav-item">
                    <NavLink 
                        className={`nav-link d-flex align-items-center ${location.pathname === '/admindashboard' ? 'active' : ''}`} 
                        to="/admindashboard" 
                        style={{ justifyContent: 'start' }}
                    >
                        <FontAwesomeIcon icon={faUser} className="fw-bold me-2" /> Dashboard
                    </NavLink>
                </li>
                <li className="side mt-2 nav-item">
                    <NavLink 
                        className="nav-link d-flex align-items-center" 
                        to="/userlist" 
                        style={{ justifyContent: 'start' }}
                    >
                        <FontAwesomeIcon icon={faClipboardList} className="me-2" /> Student List
                    </NavLink>
                </li>
                
            </ul>
        </div>
    );
}
