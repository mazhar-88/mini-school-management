import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        try {
            const value = localStorage.getItem("user");
            if (value) {
                setUser(JSON.parse(value));
            }
        } catch (error) {
            console.error("Failed to parse data from localStorage", error.message);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
