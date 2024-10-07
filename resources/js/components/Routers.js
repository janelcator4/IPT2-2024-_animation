import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home"; 
import Login from "./Login"; 
import Register from "./Register"; 
import Dashboard from "./DashBoard"; 
import Schedule from "./Schedule"; 
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./AdminDashboard";
import Enlistment from "./Enlistment"; 
import { UserProvider } from "./UserContext";
import UserList from "./UserList";

export default function Routers() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected route for Dashboard */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                   
                    <Route 
                        path="/schedule" 
                        element={
                            <PrivateRoute>
                                <Schedule />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/enlistment" 
                        element={
                            <PrivateRoute>
                                <Enlistment />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/admindashboard" 
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/userlist" 
                        element={
                            <PrivateRoute>
                                <UserList />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}

if (document.getElementById("root")) {
    ReactDOM.render(<Routers />, document.getElementById("root"));
}
