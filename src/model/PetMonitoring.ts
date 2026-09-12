interface PetMonitoring {
    petMonitoringId : number;
    petId : number;
    mood : string | null;
    energyLevel : string | null;
    food : string | null;
    sleepQuality : string | null;
    medication : boolean | null;
    weight : number | null;
    observations : string | null;
    registeredAt : string;
}

interface CreatePetMonitoringRequest {
    petId: number;
    mood?: string;
    energyLevel?: string;
    hydrationLevel?: string;
    food?: string;
    sleepQuality?: string;
    sociability?: string;
    tookMedication?: boolean;
    weight?: number;
    observations?: string;
}


export { PetMonitoring, CreatePetMonitoringRequest };