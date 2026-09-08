import { User } from "./User";

interface Tutor extends User {
    scoreEngagement: number;
}

interface RegisterTutorRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

interface RegisterTutorResponse {
    scoreEngagement: number;
    pets: unknown[];
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    typeUser: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
}


export { Tutor, RegisterTutorRequest, RegisterTutorResponse };