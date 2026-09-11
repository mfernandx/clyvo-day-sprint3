import { useMutation } from '@tanstack/react-query';
import {communityPostService} from '../service/communityPostService';

export function useCreateCommunityPost() {

    return useMutation({mutationFn: communityPostService.create,});
    
}