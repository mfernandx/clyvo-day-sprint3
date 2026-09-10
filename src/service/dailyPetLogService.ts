import { api } from './api';
import {CreateDailyPetLogRequest,DailyPetLog} from '../model/DailyPetLog';

export const dailyPetLogService = {
    
    async create(data: CreateDailyPetLogRequest,): Promise<DailyPetLog> {
        const response = await api.post<DailyPetLog>('/api/DailyPetLog',data);

        return response.data;
    }
};