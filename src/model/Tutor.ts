import { Achievement, User } from "./User";

interface Tutor extends User {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    typeUser: 'Tutor';
    isActive: boolean;
    scoreEngagement: number;
    achievement: Achievement;
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

export { Tutor, RegisterTutorRequest, RegisterTutorResponse};