import {useMutation,useQueryClient,} from '@tanstack/react-query';
import {careEventService,} from '../service/careEventService';

export function useCreateCareEvent() {
    
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: careEventService.create,
        onSuccess: (careEvent) => {queryClient.invalidateQueries({queryKey: ['careEvents',careEvent.petId]})},
    
    });
}