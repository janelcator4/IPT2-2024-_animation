import React from "react";
import Navbar from "./Navbar"; // Import the Navbar
import Footer from "./Footer"; // Import the Footer

export default function AboutUs() {
    return (
        <div className="d-flex flex-column min-vh-100"> {/* Flex container to stretch to full height */}
            <Navbar /> {/* Navbar included at the top */}
            <section className="flex-grow-1"> {/* Allows the section to grow and fill the available space */}
                <div className="container mt-5 mb-5">
                    <h1>About Us</h1>
                    <p>
                        Welcome to our project! We are a dedicated team focused on creating innovative solutions that enhance user experiences.
                    </p>
                    <p>
                        Our goal is to provide valuable information and services to our users, making their interactions seamless and enjoyable. 
                        We believe in the power of technology to transform lives, and we are committed to pushing the boundaries of what is possible.
                    </p>
                    <h2>Our Team</h2>
                    <ul>
                        <li>Jane Doe - Project Manager</li>
                        <li>John Smith - Lead Developer</li>
                        <li>Emily Johnson - Designer</li>
                        <li>Michael Brown - QA Specialist</li>
                    </ul>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or would like to know more about our project, feel free to reach out to us!
                    </p>
                </div>
            </section>
            <Footer /> {/* Footer will stick to the bottom */}
        </div>
    );
}
