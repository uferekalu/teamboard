import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem("tb_token");
        if (t) setToken(t);
    }, []);

    const login = (t: string) => {
        localStorage.setItem("tb_token", t);
        setToken(t);
    };

    const logout = () => {
        localStorage.removeItem("tb_token");
        setToken(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);