import {api} from './api';
import {Tutor} from '../model/Tutor';

export const tutorService = {

    async getAll():Promise<Tutor[]> {

        const response = await api.get<Tutor[]>('/api/Tutor');
        return response.data;

    },
    
};