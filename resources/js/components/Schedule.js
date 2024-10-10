import React from "react";
import { useUser } from "./UserContext";
import Navbar from "./StudentNavbar";

export default function Schedule() {
    const user = useUser();

    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
            {/* Navbar */}
            <Navbar user={user} />
            {/* Main Content Area */}
            <div className="container p-4 flex-grow-1">
                {/* Schedule Section */}
                <section className="mt-4">
                    <h3 className="text-muted">This Week's Schedule:</h3>
                    <div className="row">
                        {/* Monday */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Math 101 - Calculus</h5>
                                    <p className="card-text">Monday, October 14, 2024</p>
                                    <p className="card-text text-muted">8:00 AM - 9:30 AM</p>
                                </div>
                            </div>
                        </div>
                        {/* Monday - Study Group */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-info text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Study Group - Calculus</h5>
                                    <p className="card-text">Monday, October 14, 2024</p>
                                    <p className="card-text text-white">5:00 PM - 6:30 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Tuesday */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Physics 201 - Mechanics</h5>
                                    <p className="card-text">Tuesday, October 15, 2024</p>
                                    <p className="card-text text-muted">10:00 AM - 11:30 AM</p>
                                </div>
                            </div>
                        </div>
                        {/* Wednesday */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">English 102 - Literature</h5>
                                    <p className="card-text">Wednesday, October 16, 2024</p>
                                    <p className="card-text text-muted">1:00 PM - 2:30 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Wednesday - Lab Session */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-warning">
                                <div className="card-body">
                                    <h5 className="card-title">Physics Lab</h5>
                                    <p className="card-text">Wednesday, October 16, 2024</p>
                                    <p className="card-text text-muted">3:00 PM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Thursday */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Chemistry 301 - Organic Chemistry</h5>
                                    <p className="card-text">Thursday, October 17, 2024</p>
                                    <p className="card-text text-muted">9:00 AM - 10:30 AM</p>
                                </div>
                            </div>
                        </div>
                        {/* Thursday - Exam Review */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-danger text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Exam Review - Calculus</h5>
                                    <p className="card-text">Thursday, October 17, 2024</p>
                                    <p className="card-text">4:00 PM - 5:30 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Friday */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Computer Science 101 - Intro to Programming</h5>
                                    <p className="card-text">Friday, October 18, 2024</p>
                                    <p className="card-text text-muted">11:00 AM - 12:30 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Friday - Group Project */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-success text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Group Project - Programming</h5>
                                    <p className="card-text">Friday, October 18, 2024</p>
                                    <p className="card-text">2:00 PM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Saturday */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title">Midterm Exam - Calculus</h5>
                                    <p className="card-text">Saturday, October 19, 2024</p>
                                    <p className="card-text text-muted">9:00 AM - 12:00 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Saturday - Study Session */}
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm border-0 bg-primary text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Weekend Study Session - Programming</h5>
                                    <p className="card-text">Saturday, October 19, 2024</p>
                                    <p className="card-text">2:00 PM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
