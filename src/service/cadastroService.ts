import { RegisterPetRequest, RegisterPetResponse } from '../model/Pet';
import { RegisterTutorRequest, RegisterTutorResponse } from '../model/Tutor';
import { RegisterVeterinarianRequest, RegisterVeterinarianResponse } from '../model/Veterinarian';
import { api } from './api';

export const registerService = {

    async registerTutor(data: RegisterTutorRequest): Promise<RegisterTutorResponse> {
        const response = await api.post<RegisterTutorResponse>('/api/Tutor',data);
        return response.data;
    },

    async registerPet(data: RegisterPetRequest): Promise<RegisterPetResponse> {
        const response = await api.post<RegisterPetResponse>('/api/Pet',data);
        return response.data;
    },

    async registerVeterinarian(data: RegisterVeterinarianRequest): Promise<RegisterVeterinarianResponse> {
        const response = await api.post<RegisterVeterinarianResponse>('/api/Veterinarian',data);
        return response.data;
    },
};