import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
            </Routes>
        </Router>
    )
}

if (document.getElementById("root")) {
    ReactDOM.render(<Routers />, document.getElementById("root"));
}