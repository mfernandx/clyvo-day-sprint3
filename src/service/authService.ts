import { api } from './api';
import { AuthResponse, LoginRequest } from '../model/Auth';
import { User } from '../model/User';

export interface LoginResult {
    token: string;
    user: User;
    message: string;
}

export const authService = {

    async login(data: LoginRequest): Promise<LoginResult> {
        const response = await api.post<AuthResponse>('/api/Auth/login',data,);

        const authData = response.data;

        const user: User = {
            userId: authData.userId,
            fullName: authData.fullName,
            email: authData.email,
            typeUser: authData.typeUser,
        };

        return {
            token: authData.token,
            user,
            message: authData.message,
        };
    },
};