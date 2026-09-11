import {useQuery} from '@tanstack/react-query';
import {communityPostService} from '../service/communityPostService';

export function useCommunityPosts() {

    return useQuery({queryKey: ['communityPosts'], queryFn:communityPostService.getAll});
    
}