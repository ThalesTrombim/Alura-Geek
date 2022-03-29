import { createContext } from 'react';
import { useState } from 'react';
import { api } from '../services/api';
import { setCookie } from 'nookies';
import Router from 'next/router';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const isAuthenticated = false;
    const [ user, setUser ] = useState(null)
    

    async function signIn({ email, password }) {
        const res = await api.post('/login', {
            email,
            password
        })
        const { accessToken, user } = res.data;
        setUser(user);

        setCookie(undefined, 'alurageek.token', accessToken, {
            maxAge: 60 * 60 * 1, // 1 hour
        })
        
        Router.push('/')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
            { children }
        </AuthContext.Provider>
    )
}