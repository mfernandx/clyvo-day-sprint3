import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.15.11:10000',
    timeout: 10000,

    headers: {
        'Content-Type': 'application/json',
    },
});