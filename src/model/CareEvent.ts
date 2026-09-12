type CareEventStatus = | 0 | 1 | 2 | 3;

interface CareEvent {
    careEventId: number;
    petId: number;
    pet: null;
    typeEvent: string;
    description: string;
    eventDate: string;
    observations: string | null;
    status: CareEventStatus;
    createdAt: string;
}

interface CreateCareEventRequest {
    petId: number;
    typeEvent: string;
    description: string;
    eventDate: string;
    observations?: string;
}

export {CareEvent, CreateCareEventRequest, CareEventStatus}

