import { useMutation } from '@tanstack/react-query';

import { registerService } from '../service/cadastroService';

export function useRegisterVeterinarian() {

  return useMutation({mutationFn:registerService.registerVeterinarian});
  
}