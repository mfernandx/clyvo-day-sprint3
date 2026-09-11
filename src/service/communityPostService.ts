import { api } from './api';
import {CommunityPost,CreateCommunityPostRequest,} from '../model/CommunityPost';

export const communityPostService = {

    async getAll(): Promise<CommunityPost[]> {

        const response = await api.get<CommunityPost[]>('/api/CommunityPost');
        return response.data;

    },

    async create(data: CreateCommunityPostRequest): Promise<CommunityPost> {

        const response = await api.post<CommunityPost>('/api/CommunityPost',data);
        return response.data;

    },
};