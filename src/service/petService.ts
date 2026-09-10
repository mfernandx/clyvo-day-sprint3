import { api } from './api';
import { Pet } from '../model/Pet';

export const petService = {

    async getAll(): Promise<Pet[]> {
        const response = await api.get<Pet[]>('/api/Pet');
        return response.data;
    },
    
};