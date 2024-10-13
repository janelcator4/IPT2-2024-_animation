import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user } = useUser(); 
    const [unauthorized, setUnauthorized] = useState(false); 
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate(); 

    
    useEffect(() => {
        if (user) {
            
            if (requiredRole !== undefined && user.role !== requiredRole) {
                setUnauthorized(true);
                setShowModal(true); 
            } else {
                setUnauthorized(false); 
            }
        }
    }, [user, requiredRole]);

    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    
    const handleModalClose = () => {
        setShowModal(false);
        navigate(-1); 
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
