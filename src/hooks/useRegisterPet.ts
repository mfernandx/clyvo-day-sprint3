import { useMutation } from '@tanstack/react-query';

import { registerService } from '../service/cadastroService';

export function useRegisterPet() {

    return useMutation({mutationFn: registerService.registerPet});
    
}