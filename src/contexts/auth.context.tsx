import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/auth.service';
import AsyncStorage from '@react-native-community/async-storage';
import api, * as apiService from '../services/api.service';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(): Promise<void>;
    singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadStorageData() {
            const userStorage = await AsyncStorage.getItem('@MCPAuth:user');
            const tokenStorage = await AsyncStorage.getItem('@MCPAuth:token');

            if (userStorage && tokenStorage) {
                setUser(JSON.parse(userStorage));
                apiToken(tokenStorage);
                setLoading(false);
            }
        }

        loadStorageData();
    });

    async function signIn() {
        const response = await authService.signIn();
        setUser(response.user);
        apiToken(response.token);

        await AsyncStorage.setItem('@MCPAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@MCPAuth:token', response.token);
    }

    function signOut(): void {
        AsyncStorage.clear().then(() => {
            setUser(null);
            api.defaults.headers['Authorization'] = null;
        });
    }

    function apiToken(token: string): void {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}