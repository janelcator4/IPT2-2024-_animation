import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user } = useUser(); // Get the user from context
    const [unauthorized, setUnauthorized] = useState(false); // State for unauthorized access
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Effect to check user role and set unauthorized state accordingly
    useEffect(() => {
        if (user) {
            // Check if the user role matches the required role
            if (requiredRole !== undefined && user.role !== requiredRole) {
                setUnauthorized(true);
                setShowModal(true); // Show the modal if unauthorized
            } else {
                setUnauthorized(false); // User is authorized
            }
        }
    }, [user, requiredRole]);

    // If no user is logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Function to handle the modal close and navigate back
    const handleModalClose = () => {
        setShowModal(false);
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <>
            {/* Render the modal if unauthorized */}
            {unauthorized && showModal && (
                <div className="modal show d-block" role="dialog" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Unauthorized Access</h5>
                                
                            </div>
                            <div className="modal-body">
                                <p>You do not have permission to view this page.</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={handleModalClose}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render the children if authorized */}
            {!unauthorized && children}
        </>
    );
};

export default PrivateRoute;
