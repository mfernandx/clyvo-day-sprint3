import { useMutation } from '@tanstack/react-query';
import { authService } from '../service/authService';

export function useLogin() {
    return useMutation({
        mutationFn: authService.login,
    });
}