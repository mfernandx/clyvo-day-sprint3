import { api } from './api';
import { CareEvent, CreateCareEventRequest, } from '../model/CareEvent';

export const careEventService = {
    async create(data: CreateCareEventRequest): Promise<CareEvent> {

        const response = await api.post<CareEvent>('/api/CareEvent',data);
        return response.data;

    },
};