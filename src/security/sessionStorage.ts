import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../model/User';

const TOKEN_KEY = '@clyvo:token';
const USER_KEY = '@clyvo:user';

export const sessionStorage = {

    async saveSession(token: string, user: User) {
        await AsyncStorage.multiSet([[TOKEN_KEY, token],[USER_KEY, JSON.stringify(user)]]);
    },

    async getToken() {
        return AsyncStorage.getItem(TOKEN_KEY);
    },

    async getUser(): Promise<User | null> {
        const storedUser = await AsyncStorage.getItem(USER_KEY);

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser) as User;
    },

    async clearSession() {
        await AsyncStorage.multiRemove([TOKEN_KEY,USER_KEY,]);
    }
};