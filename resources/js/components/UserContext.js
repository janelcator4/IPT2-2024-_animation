import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error reading user from local storage", error);
            return null;
        }
    });

    // Logout function clears user and token from localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Automatically store the user in localStorage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // You can add a token/session validity check here
    useEffect(() => {
        const checkSessionValidity = () => {
            const token = localStorage.getItem("token");
            // You can make an API call or check token expiration logic here
            if (!token) {
                logout();
            }
        };

        // Call the check when the component mounts
        checkSessionValidity();
    }, []);

    const contextValue = useMemo(() => ({ user, setUser, logout }), [user]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
