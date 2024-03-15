import {CommentInfo} from "../common-info/comment-info/CommentInfo";
import {v4 as uuidv4} from "uuid";

let defaultComments : CommentInfo[] = [
    {
        blogId: 0,
        id: new Date().getTime(),
        commentUserId: 1,
        username: "Danya",
        commentText: "Очень круто! Как часто он цветёт?",
        usersLiked: ["0"],
        usersDisliked: []
    }
];

export default defaultComments;