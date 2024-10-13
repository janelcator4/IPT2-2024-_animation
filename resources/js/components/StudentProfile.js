import React from "react";
import StudentNavbar from "./StudentNavbar";
import { useUser } from "./UserContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUser, faEnvelope, faIdBadge, faEdit, faCamera } from "@fortawesome/free-solid-svg-icons";

export default function StudentProfile() {
    const { user } = useUser() || {}; 
    const { id, name, email } = user || {}; 

    return (
        <div className="student-profile-container bg-light min-vh-100">
            <StudentNavbar />

            {/* Hero Section */}
            <header className="text-center py-5 bg-primary text-white position-relative">
                <h1 className="display-4 fw-bold">Welcome, {name || "User"}!</h1>
                <p className="lead">Your personalized student profile</p>
                <button className="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y me-4" style={{ zIndex: 10 }}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit Profile
                </button>
            </header>

            {/* Profile Section */}
            <section className="student-details py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-10 mb-4">
                            <div className="card border-0 shadow-lg rounded-lg overflow-hidden">
                                <div className="card-body p-5">
                                    <div className="row align-items-center">
                                        
                                        <div className="col-md-4 text-center mb-4 mb-md-0 position-relative">
                                            <div className="profile-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto position-relative" style={{ width: "150px", height: "150px" }}>
                                                <span className="display-6">{name ? name.charAt(0) : "U"}</span>
                                                <div className="avatar-upload-overlay position-absolute top-50 start-50 translate-middle d-none">
                                                    <button className="btn btn-light rounded-circle p-2">
                                                        <FontAwesomeIcon icon={faCamera} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="btn btn-sm btn-outline-primary mt-3" onMouseEnter={() => document.querySelector(".avatar-upload-overlay").classList.remove("d-none")} onMouseLeave={() => document.querySelector(".avatar-upload-overlay").classList.add("d-none")}>
                                                Upload Picture
                                            </button>
                                        </div>

                                        {/* Personal Information */}
                                        <div className="col-md-8">
                                            <h3 className="mb-4">Personal Information</h3>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faIdBadge} className="me-3 text-muted" />
                                                    <strong>ID:</strong> <span className="text-muted ms-2">{id || "N/A"}</span>
                                                </li>
                                                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faUser} className="me-3 text-muted" />
                                                    <strong>Name:</strong> <span className="text-muted ms-2">{name || "N/A"}</span>
                                                </li>
                                                <li className="list-group-item px-0 py-3 d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faEnvelope} className="me-3 text-muted" />
                                                    <strong>Email:</strong> <span className="text-muted ms-2">{email || "N/A"}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-lg rounded-lg">
                                <div className="card-body text-center">
                                    <h4 className="card-title">Courses Enrolled</h4>
                                    <p className="text-muted">No courses enrolled.</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-lg rounded-lg">
                                <div className="card-body text-center">
                                    <h4 className="card-title">Achievements</h4>
                                    <p className="text-muted">No achievements yet.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Recent Activity</h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg">
                                <div className="card-body">
                                    <h5 className="text-center">No recent activity found</h5>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
