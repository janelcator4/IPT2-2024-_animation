import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
    return (
        <div className="home-container">
            <Navbar />
            <header className="hero text-center py-5">
                <div className="hero-content">
                    <h1 className="text-white">Enroll for a Bright Future</h1>
                    <p className="lead text-white">
                        Join our community of learners and unlock endless opportunities.
                    </p>
                    <a href="/register" className="btn btn-primary btn-lg mt-3">
                        Start Enrollment
                    </a>
                </div>
            </header>

            {/* Why Choose Us Section */}
            <section className="why-choose-us py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose Us?</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card feature-box text-center shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Accredited Programs</h3>
                                    <p className="card-text">
                                        Our curriculum is designed to meet industry standards and prepare students for their future careers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card feature-box text-center shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Experienced Faculty</h3>
                                    <p className="card-text">
                                        Learn from experts with years of experience in both teaching and industry practices.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card feature-box text-center shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Flexible Learning</h3>
                                    <p className="card-text">
                                        Offering both in-person and online learning options to fit your schedule.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">Features</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card feature-box text-center shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Interactive Learning</h3>
                                    <p className="card-text">
                                        Engage with our interactive tools and resources to enhance your learning experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card feature-box text-center shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Community Support</h3>
                                    <p className="card-text">
                                        Join a community of learners and get support from peers and mentors.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card feature-box text-center shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Career Guidance</h3>
                                    <p className="card-text">
                                        Benefit from our career services to help you land your dream job.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta bg-primary text-white text-center py-5">
                <div className="container">
                    <h2>Ready to Apply?</h2>
                    <p>
                        Start your application now and take the first step toward a successful career!
                    </p>
                    <a
                        href="/register"
                        className="btn btn-light btn-lg mt-3"
                    >
                        Apply Now
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
}
