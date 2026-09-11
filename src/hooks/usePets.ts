import { useQuery } from '@tanstack/react-query';
import { petService } from '../service/petService';

export function usePets() {

    return useQuery({queryKey: ['myPets'],queryFn: petService.getMyPets,});
    
}