import {useMutation,} from '@tanstack/react-query';
import {userService,} from '../service/userService';

interface UpdatePhoneVariables {
    userId: number;
    phoneNumber: string;
}

export function useUpdatePhone() {

    return useMutation({

        mutationFn: ({userId,phoneNumber}: UpdatePhoneVariables) => userService.updatePhone(userId,{phoneNumber}),
    
    });

}