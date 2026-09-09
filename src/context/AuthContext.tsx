import React, {createContext,ReactNode,useContext,useEffect,useState,} from 'react';
import { User } from '../model/User';
import { authService } from '../service/authService';
import { sessionStorage } from '../security/sessionStorage';

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    isLoadingSession: boolean;
    signIn: (token: string,user: User) => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {children: ReactNode}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] =useState<User | null>(null);
    const [isLoadingSession,setIsLoadingSession] = useState(true);
    const isAuthenticated = !!user;

    async function signIn(token: string,authenticatedUser: User) {
        await sessionStorage.saveSession(token,authenticatedUser);
        setUser(authenticatedUser);
    }

    async function signOut() {
        await sessionStorage.clearSession();    
        setUser(null);
    }

    useEffect(() => {
        async function restoreSession() {
            try {
                const token = await sessionStorage.getToken();

                if (!token) {
                    return;
                }

                const authenticatedUser = await authService.me();
                setUser(authenticatedUser);

            } catch {
                await sessionStorage.clearSession();
                setUser(null);
                
            } finally {
                setIsLoadingSession(false);
            }
        }

    restoreSession();}, []);

    return (
        <AuthContext.Provider value={{user,isAuthenticated,isLoadingSession,signIn,signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser utilizado dentro de AuthProvider.');
    }

    return context;
}