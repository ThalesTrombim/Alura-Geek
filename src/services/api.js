import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'alurageek.token': token } = parseCookies();

export const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BACKEND,
    baseURL: 'http://localhost:4000',
    
})

if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}