import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { api } from '../services/api';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { supabaseAdmin, supabaseClient } from '../services/supabaseClient';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const isAuthenticated = false;
    const [ user, setUser ] = useState(null)
    

    useEffect(() => {
        const { 'alurageek.token': token } = parseCookies();

        if(token){
            supabaseClient.auth.api.getUser(token)
                .then(({ user }) => {
                    const res = supabaseClient.from('profiles').select('*').eq('id', user.id)
                    return res
                })
                .then(({data}) => {
                    setUser(data[0])
                })
        }

    }, [])

    async function signIn({ email, password }) {
        const { user, session } = await supabaseClient.auth.signIn({
            email,
            password,
        })

        const { data } = await supabaseClient.from('profiles').select('*').eq('id', user.id)

        setUser(data[0])

        const token = session.access_token;

        setCookie(undefined, 'alurageek.token', token, {
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