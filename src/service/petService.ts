import { api } from './api';
import { Pet } from '../model/Pet';

export const petService = {

    async getMyPets(): Promise<Pet[]> {
        const response = await api.get<Pet[]>('/api/Pet/my');
        return response.data;
    },

    async getAll(): Promise<Pet[]> {
        const response = await api.get<Pet[]>('/api/Pet');
        return response.data;
    },
    
};