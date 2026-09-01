type TypeUser = 'Tutor' | 'Veterinario';

interface User {
  userId: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  typeUser: TypeUser;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export { TypeUser, User };