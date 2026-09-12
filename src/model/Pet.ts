import { CareEvent } from "./CareEvent";
import { PetMonitoring } from "./PetMonitoring";

type Sex = 'Fêmea' | 'Macho' | 'Desconhecido' ;

interface Pet {
    petId : number;
    tutorId : number;
    name : string;
    species : string;
    breed : string;
    sex : Sex;
    age : number;
    birthDate : string;
}

interface RegisterPetRequest {
    tutorId: number;
    name: string;
    species: string;
    breed: string;
    sex: string;
    age: number;
    birthDate: string;
}

interface RegisterPetResponse {
    petId: number;
    tutorId: number;
    tutor: unknown | null;
    name: string;
    species: string;
    breed: string;
    sex: string;
    age: number;
    birthDate: string;
    petMonitorings: PetMonitoring[];
    careEvents: CareEvent[];
}

export { Sex, Pet, RegisterPetRequest, RegisterPetResponse };