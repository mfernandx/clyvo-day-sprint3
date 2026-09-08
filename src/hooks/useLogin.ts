import { useMutation } from '@tanstack/react-query';
import { authService } from '../service/authService';
import { sessionStorage } from '../security/sessionStorage';

export function useLogin() {
    return useMutation({
        mutationFn: authService.login,

        onSuccess: async (data) => {await sessionStorage.saveSession(data.token,data.user)},
    });
}