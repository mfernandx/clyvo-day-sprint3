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

export { Sex, Pet };