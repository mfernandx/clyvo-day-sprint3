type TypeUser = 'Tutor' | 'Veterinario';

type Achievement = | 'Nenhum' | 'InicianteAtencioso'| 'TutorDedicado' | 'GuardiãoPet' | 'ClyvoMaster';

interface User {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    typeUser: TypeUser;
}

interface RegisterUserData {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    typeUser: TypeUser;
}

interface VeterinarianUser extends User {
    typeUser: 'Veterinario';
    crmv: string;
    state: string;
    specialty: string;
}

interface TutorUser extends User {
    typeUser: 'Tutor';
    scoreEngagement: number;
    achievement: Achievement;
}

export { TypeUser, Achievement, User, RegisterUserData, TutorUser, VeterinarianUser };