import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Schedule from "./Schedule";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./AdminDashboard"; 
import Enlistment from "./Enlistment"; 
import UserList from "./UserList"; 
import StudentProfile from "./StudentProfile"; 
import { UserProvider } from "./UserContext";

export default function Routers() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Accessible to all logged-in users (role 0) */}
                    <Route 
                        path="/schedule" 
                        element={
                            <PrivateRoute requiredRole={0}>
                                <Schedule />
                            </PrivateRoute>
                        } 
                    />

                    {/* Enlistment is accessible only to regular users (role 0) */}
                    <Route 
                        path="/enlistment" 
                        element={
                            <PrivateRoute requiredRole={0}> 
                                <Enlistment />
                            </PrivateRoute>
                        } 
                    />

                    
                    <Route 
                        path="/studentprofile" 
                        element={
                            <PrivateRoute requiredRole={0}>
                                <StudentProfile />
                            </PrivateRoute>
                        } 
                    />

                    {/* Admin-only routes (role 1) */}
                    <Route 
                        path="/admindashboard" 
                        element={
                            <PrivateRoute requiredRole={1}>
                                <AdminDashboard />
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path="/userlist" 
                        element={
                            <PrivateRoute requiredRole={1}>
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
