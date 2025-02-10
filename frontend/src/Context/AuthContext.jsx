import React, { createContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        userDetails: null,
        accessToken: null,
        email: null,
        otpToken: null,

    });

    const login = (userDetails, tokens) => {
        setAuthState({
            userDetails,
            accessToken: tokens.accessToken,
        });
    };

    const logout = () => {
        setAuthState({
            userDetails: null,
            accessToken: null,
            email:null,
            otpToken: null,

        });
    };

    const reset = (email, otpToken) => {
        setAuthState({
            email,
        });

    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, reset }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;