import React, { createContext, useState, useEffect, useMemo } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Recuperar el usuario desde localStorage si existe
        return localStorage.getItem('user') || null;
    });

    useEffect(() => {
        // Almacenar el usuario en localStorage cuando cambia
        if (user) {
            localStorage.setItem('user', user);
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};