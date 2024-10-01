import React, { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextType {
    id: number;
    user: string;
    token: string;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (username: string, password: string, role?: string[]) => Promise<void>;
    setUser: (user: string) => void;
    setToken: (token: string) => void;
    setId: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [id, setId] = useState<number>(0);


    const login = async (username: string, password: string) => {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();
        setUser(result.username);
        setToken(result.accessToken);
        setId(result.id)
        sessionStorage.setItem("id", result.id)
        sessionStorage.setItem("user", result.username)
        sessionStorage.setItem("token", result.accessToken)
    };

    const logout = () => {
        setUser('');
        setToken('');
        sessionStorage.setItem("id", '')
        sessionStorage.setItem("user", '')
        sessionStorage.setItem("token", '')
    };

    const signup = async (username: string, password: string) => {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }
    };


    return (
        <AuthContext.Provider value={{ user, token, id, login, logout, signup, setUser, setToken, setId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};