import { User } from "./User";

interface Tutor extends User {
    cpf: string;
    scoreEngagement: number;
}

export { Tutor };