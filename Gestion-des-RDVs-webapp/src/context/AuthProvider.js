/* eslint-disable react/react-in-jsx-scope */
import React, { createContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('token');
        return storedAuth ? JSON.parse(storedAuth) : {};
      });
    
      // Update localStorage whenever auth changes
      useEffect(() => {
        localStorage.setItem('token', JSON.stringify(auth));
      }, [auth]);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;