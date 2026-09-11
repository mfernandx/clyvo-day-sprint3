import { TypeUser } from './User';

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    message: string;
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    typeUser: TypeUser;
    token: string;
}

export { LoginRequest, AuthResponse };