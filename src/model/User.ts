type TypeUser = 'Tutor' | 'Veterinario';

interface User {
    userId: number;
    fullName: string;
    email: string;
    typeUser: TypeUser;
}

interface RegisterUserData {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    typeUser: TypeUser;
}

export { TypeUser, User, RegisterUserData };