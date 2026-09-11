import {useMutation,useQueryClient} from '@tanstack/react-query';
import {communityPostService} from '../service/communityPostService';

export function useCreateCommunityPost() {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: communityPostService.create,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ['communityPosts']})},
        
    });
}