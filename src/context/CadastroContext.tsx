import {createContext,ReactNode,useContext,useState,} from 'react';
import { RegisterUserData } from '../model/User';

interface RegisterUserContextData {
    registerUserData: RegisterUserData | null;
    saveRegisterUserData: (data: RegisterUserData) => void;
    clearRegisterUserData: () => void;
}

interface RegisterUserProviderProps {children: ReactNode;}

const RegisterUserContext = createContext<RegisterUserContextData | undefined>(undefined,);

export function RegisterUserProvider({children,}: RegisterUserProviderProps) {

    const [registerUserData,setRegisterUserData] = useState<RegisterUserData | null>(null);

    function saveRegisterUserData(data: RegisterUserData,) {
        setRegisterUserData(data);
    }

    function clearRegisterUserData() {
        setRegisterUserData(null);
    }

    return (
        <RegisterUserContext.Provider value={{registerUserData,saveRegisterUserData,clearRegisterUserData,}}>
            {children}
        </RegisterUserContext.Provider>
    );
}

export function useRegisterUser() {
    const context = useContext(RegisterUserContext);

    if (!context) {
        throw new Error('useRegisterUser deve ser utilizado dentro de RegisterUserProvider.',);
    }

    return context;
}