import { User } from "./User";

interface Veterinarian extends User{
    crmv: string;
    state: string;
    specialty: string;
}

export { Veterinarian };