import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard"; 
import Schedule from "./Schedule";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./AdminDashboard"; 
import Enlistment from "./Enlistment"; 
import UserList from "./UserList"; 
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

                    {/* Accessible to all logged-in users */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute role="user">
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path="/schedule" 
                        element={
                            <PrivateRoute role="user">
                                <Schedule />
                            </PrivateRoute>
                        } 
                    />

                    {/* Enlistment is accessible only to regular users */}
                    <Route 
                        path="/enlistment" 
                        element={
                            <PrivateRoute role="user"> 
                                <Enlistment />
                            </PrivateRoute>
                        } 
                    />

                    {/* Admin-only routes */}
                    <Route 
                        path="/admindashboard" 
                        element={
                            <PrivateRoute role="admin">
                                <AdminDashboard />
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path="/userlist" 
                        element={
                            <PrivateRoute role="admin">
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
