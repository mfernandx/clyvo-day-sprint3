import { api } from './api';
import {CreatePetMonitoringRequest,PetMonitoring} from '../model/PetMonitoring';

export const petMonitoringService = {

    async create(data: CreatePetMonitoringRequest): Promise<PetMonitoring> {
        const response =await api.post<PetMonitoring>('/api/PetMonitoring',data);
        return response.data;
    },
};