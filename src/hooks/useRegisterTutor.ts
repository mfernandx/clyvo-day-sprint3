import { useMutation } from '@tanstack/react-query';

import { registerService } from '../service/cadastroService';

export function useRegisterTutor() {

    return useMutation({mutationFn: registerService.registerTutor});

}