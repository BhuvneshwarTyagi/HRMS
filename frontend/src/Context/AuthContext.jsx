import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import CryptoJS from 'crypto-js';
import Loading from '../LoadingScreen/Loading';

// Hash and unhash data utility functions
const hashData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
};

const unhashData = (hashedData) => {
    const bytes = CryptoJS.AES.decrypt(hashedData, 'secret-key');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// AuthContext for authentication state
const AuthContext = createContext();


// Custom hooks for using contexts
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    // Auth state management
    const [authState, setAuthState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useCallback((path) => {
        //console.log("Here")

        // Check if we're already on the target path to prevent unnecessary navigation
        if (window.location.pathname !== path) {
            //console.log("Here")
            window.location.href = path;
        }
    }, []);

    // Memoized authentication check function
    const checkAuthState = useCallback(async () => {
        if (authState) {
            setIsLoading(false);

            return
        };

        const storedAuthState = localStorage.getItem('authState');  // Use localStorage instead
        //console.log("stored", storedAuthState);
        if (storedAuthState) {
            try {
                const decryptedAuthState = unhashData(storedAuthState);
                //console.log(decryptedAuthState, 'decrypt')
                setAuthState(decryptedAuthState);
                const currentURL = window.location.href.split('/')[3];
                
                if (!currentURL) {
                    navigate("/dashboard");
                }
                setIsLoading(false);

                return decryptedAuthState;
            } catch (error) {
                //console.error('Error decrypting auth state:', error);
                navigate('/'); // Redirect to login if decryption fails
            }
        } else {
            // If no auth state, redirect to login
            navigate('/');
        }
        setIsLoading(false);
        return null;
    }, []);


    // Initial auth state check
    useEffect(() => {
        checkAuthState();
    }, []);

    const updateAccessToken = useCallback((accessToken, authState) => {
        const newAuthState = { ...authState, accessToken };
        const hashedAuthState = hashData(newAuthState);
        localStorage.setItem('authState', hashedAuthState);
        setAuthState(newAuthState);

    }, [navigate]);
    // Observe authState changes for filter options

    useEffect(() => {
        //console.log("Auth state updated:", authState);
    }, [authState]);

    // Login function with improved state management
    const login = useCallback((userDetails, tokens) => {
        const newAuthState = {
            userDetails,
            role: userDetails.role,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            otpToken: null,
        };

        // Encrypt and store auth state in localStorage
        const hashedAuthState = hashData(newAuthState);
        localStorage.setItem('authState', hashedAuthState);

        // Update local state
        setAuthState(newAuthState);
        navigate(`/dashboard`);
        // Navigate to dashboard or dashboard page
    }, []);

    const logout = useCallback(() => {
        // Clear localStorage
        localStorage.removeItem('authState');

        // Reset auth state
        setAuthState(null);

        // Navigate to login page
        navigate('/');
    }, [navigate]);


    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'authState' && !event.newValue) {
                // If `authState` is removed from localStorage, trigger logout
                setAuthState(null);
                navigate('/');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Reset function
    const reset = useCallback((email, otpToken) => {
        const newAuthState = {
            email,
            otpToken,
        };

        // Encrypt and store auth state
        const hashedAuthState = hashData(newAuthState);
        sessionStorage.setItem('authState', hashedAuthState);

        // Update local state
        setAuthState(newAuthState);
    }, []);

    // Loading state
    if (isLoading) {
        return <Loading />;
    }

    // Provide context
    return (
        <AuthContext.Provider value={{
            authState,
            login,
            logout,
            reset,
            navigate,
            setAuthState,
            checkAuthState,
            updateAccessToken,
            isLoading
        }}>

            {children}

        </AuthContext.Provider>
    );
};

export default AuthContext;