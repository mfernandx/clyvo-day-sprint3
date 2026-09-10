export type DailyPetLogType = | 'Passeio' | 'Momento' | 'Saúde' | 'Rotina' | 'Brincadeira' | 'Comportamento' | 'Treino' | 'Outro';

export type DailyPetLogPrivacy = | 0 | 1;

export interface CreateDailyPetLogRequest {
    petId: number;
    dailyPetLogType: DailyPetLogType;
    content: string;
    privacy: DailyPetLogPrivacy;
}

export interface DailyPetLog {
    dailyPetLogId: number;
    petId: number;
    createdByUserId: number;
    dailyPetLogType: DailyPetLogType;
    content: string;
    imageUrl: string | null;
    privacy: DailyPetLogPrivacy;
    registeredAt: string;
}