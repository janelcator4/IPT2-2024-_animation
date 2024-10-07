// resources/js/components/Footer.js
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <div className="container">
                <p className="mb-1">© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                <div>
                    <a href="https://www.facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                    <a href="https://www.twitter.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
}
