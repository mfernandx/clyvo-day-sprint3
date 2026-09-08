type TypeUser = 'Tutor' | 'Veterinario';

interface User {
    userId: number;
    fullName: string;
    email: string;
    typeUser: TypeUser;
}

export { TypeUser, User };