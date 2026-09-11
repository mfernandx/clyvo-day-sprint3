export type PublicStackParamList = {
    Inicio: undefined;
    Login: undefined;
    CadastroUser: undefined;
    CadastroPet: undefined;
    CadastroVeterinarian: undefined;
};

export type TutorTabParamList = {
    TutorHome: undefined;
    Journey: undefined;
    Community: undefined;
    TutorProfile: undefined;
};

export type TutorStackParamList = {
    TutorTabs: undefined;
    PetsTutor: undefined;
    DailyPetLogCreate: {petId: number;};
    CommunityPostCreate: undefined;
};

export type VeterinarianTabParamList = {
    VeterinarianHome: undefined;
    Patients: undefined;
    Community: undefined;
    VeterinarianProfile: undefined;
};

export type VeterinarianStackParamList = {
    VeterinarianTabs: undefined;
    CommunityPostCreate: undefined;
};

export type CommunityStackParamList = {
    Community: undefined;
    CommunityPostCreate: undefined;
};