type TypeUser = 'Tutor' | 'Veterinario';

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

export { TypeUser, User, RegisterUserData, VeterinarianUser };