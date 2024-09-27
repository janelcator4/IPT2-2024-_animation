import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className='home'>
            <Link to="/">Home</Link> <br />
            <Link to="/aboutus">About Us</Link> <br />
            <Link to="/contactus">Contact Us</Link> <br />
            <hi>Home</hi>
        </div>
    )
}