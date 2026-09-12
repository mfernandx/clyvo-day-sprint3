import {useMutation,useQueryClient,} from '@tanstack/react-query';
import {petMonitoringService,} from '../service/petMonitoringService';

export function useCreatePetMonitoring() {
    const queryClient = useQueryClient();

    return useMutation({mutationFn:petMonitoringService.create, onSuccess: (monitoring) => {
        queryClient.invalidateQueries({
            queryKey: ['petMonitorings',monitoring.petId,],
        });
    }});
}