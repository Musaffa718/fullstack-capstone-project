import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedName = sessionStorage.getItem('name');
        const bearerToken = sessionStorage.getItem('bearer-token');
        if (storedName && bearerToken) {
            setUserName(storedName);
            setIsLoggedIn(true);
        }
    }, []);

    const setUserNameHandler = (name) => {
        setUserName(name);
    };

    const logout = () => {
        sessionStorage.removeItem('bearer-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        setUserName('');
    };

    return (
        <AppContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, userName, setUserName: setUserNameHandler, logout }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

export default AppContext;
