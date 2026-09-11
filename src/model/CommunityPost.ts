export interface CreateCommunityPostRequest {
    category: string;
    content: string;
    imageUrl?: string | null;
    location?: string | null;
}

export interface CommunityPost {
    communityPostId: number;
    userId: number;
    category: string;
    content: string;
    imageUrl?: string | null;
    location?: string | null;
    registeredAt: string;
}