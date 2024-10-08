import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children }) => {
    const { user } = useUser(); // Get the user from context

    return user ? children : <Navigate to="/login" />; // Redirect if user is not logged in
};

export default PrivateRoute;
