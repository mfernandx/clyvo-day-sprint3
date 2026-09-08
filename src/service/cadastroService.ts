import { RegisterPetRequest, RegisterPetResponse } from '../model/Pet';
import { RegisterTutorRequest, RegisterTutorResponse } from '../model/Tutor';
import { api } from './api';

export const registerService = {

    async registerTutor(data: RegisterTutorRequest): Promise<RegisterTutorResponse> {
        const response = await api.post<RegisterTutorResponse>('/api/Tutor',data);
        return response.data;
    },

    async registerPet(data: RegisterPetRequest,): Promise<RegisterPetResponse> {
        const response = await api.post<RegisterPetResponse>('/api/Pet',data);
        return response.data;
    },
};