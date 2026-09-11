type CommunityUserType = | 'Tutor' | 'Veterinario';

interface CreateCommunityPostRequest {
    category: string;
    content: string;
    imageUrl?: string | null;
    location?: string | null;
}

interface CommunityPost {
    communityPostId: number;
    userId: number;
    userName: string;
    userType: CommunityUserType;
    category: string;
    content: string;
    imageUrl?: string | null;
    location?: string | null;
    registeredAt: string;
}

export {CommunityUserType, CreateCommunityPostRequest, CommunityPost}