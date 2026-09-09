import { User } from "./User";

interface Veterinarian extends User{
    crmv: string;
    state: string;
    specialty: string;
}

interface RegisterVeterinarianRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    crmv: string;
    state: string;
    specialty: string;
}

interface RegisterVeterinarianResponse {
    crmv: string;
    state: string;
    specialty: string;
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    typeUser: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
}

export { Veterinarian, RegisterVeterinarianRequest, RegisterVeterinarianResponse };