import { useQuery } from '@tanstack/react-query';
import {dailyPetLogService,} from '../service/dailyPetLogService';

export function useDailyPetLogs(petId?: number,) {
    
    return useQuery({
        queryKey: ['dailyPetLogs',petId],

        queryFn: () => dailyPetLogService.getByPetId(petId!),

        enabled: !!petId
    });
}