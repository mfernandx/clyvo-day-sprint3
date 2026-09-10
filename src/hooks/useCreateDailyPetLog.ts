import { useMutation } from '@tanstack/react-query';

import { dailyPetLogService } from '../service/dailyPetLogService';

export function useCreateDailyPetLog() {

    return useMutation({mutationFn: dailyPetLogService.create,});
    
}