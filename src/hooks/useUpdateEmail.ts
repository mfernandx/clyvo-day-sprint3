import {useMutation} from '@tanstack/react-query';
import {userService} from '../service/userService';

interface UpdateEmailVariables {
    userId: number;
    email: string;
}

export function useUpdateEmail() {

    return useMutation({

        mutationFn: ({userId,email}: UpdateEmailVariables) => userService.updateEmail(userId,{email}),
        
    });
}