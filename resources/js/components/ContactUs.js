import React, { useState } from "react";
import Navbar from "./Navbar"; // Import the Navbar

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission (e.g., sending data to an API)
        console.log("Form submitted:", formData);
        // Reset form after submission (optional)
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="container  mt-4 mb-4 card shadow p-4  "style={{ maxWidth: "900px", width: "100%" }}> {/* Added mb-5 for bottom margin */}
            <h1 className="text-center">Contact Us</h1>
            <p className="text-center">We'd love to hear from you!</p>
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-8 col-sm-10 mx-auto">
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
