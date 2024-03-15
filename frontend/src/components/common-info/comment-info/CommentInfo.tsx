export interface CommentInfo {
    blogId: number;
    id: number;
    commentUserImageUri?: string;
    commentUserId: number;
    username?: string;
    commentText: string;
    usersLiked?: string[];
    usersDisliked?: string[];
    replies?: CommentInfo[];
}