import { api } from './api';

export interface UpdateEmailRequest {email: string;}

export interface UpdatePhoneRequest {phoneNumber: string;}

export const userService = {
    async updateEmail(userId: number,data: UpdateEmailRequest): Promise<void> {

        await api.put(`/api/User/${userId}/email`,data);

    },

    async updatePhone(userId: number,data: UpdatePhoneRequest): Promise<void> {

        await api.put(`/api/User/${userId}/phone`,data);
        
    },
};