interface CareEvent {
    careEventId : number;
    petId : number;
    typeEvent : string;
    description : string;
    eventDate : string;
    eventCompleted : boolean;
    observations : string;
}

export { CareEvent };