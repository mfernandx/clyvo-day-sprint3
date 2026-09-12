import {useQuery} from '@tanstack/react-query';
import {tutorService} from '../service/tutorService';

export function useTutors() {

    return useQuery({queryKey: ['tutors'], queryFn:tutorService.getAll});
    
}