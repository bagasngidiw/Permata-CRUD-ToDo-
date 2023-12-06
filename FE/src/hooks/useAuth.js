import { useState, useEffect } from 'react';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Function to check if the user is authenticated based on token presence
        const checkAuthentication = () => {
            const token = localStorage.getItem('token');
            if (token) {
                // Additional logic for token validation can be added here
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication(); // Check authentication status on initial render
    }, []);

    // Expose the isAuthenticated status to be used throughout the application
    return { isAuthenticated };
}
