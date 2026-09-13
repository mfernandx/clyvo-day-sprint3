import { useQuery } from '@tanstack/react-query';
import { careEventService } from '../service/careEventService';

export function useCareEvents(petId?: number) {

    return useQuery({queryKey: ['careEvents', petId],queryFn: () => careEventService.getByPet(petId!),enabled: !!petId});

}