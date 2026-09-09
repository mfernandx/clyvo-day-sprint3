import axios from 'axios';
import { sessionStorage } from '../security/sessionStorage';

export const api = axios.create({
    baseURL: 'http://192.168.15.11:10000',
    timeout: 10000,

    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    
    async (config) => {

        const token = await sessionStorage.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);