import { useQuery } from '@tanstack/react-query';
import { petService } from '../service/petService';

export function usePatients() {

    return useQuery({queryKey: ['patients'],queryFn: petService.getAll});

}