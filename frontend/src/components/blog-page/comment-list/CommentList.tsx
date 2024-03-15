import React, {useState} from 'react';
import './CommentList.scss';
import {CommentInfo} from "../../common-info/comment-info/CommentInfo";
import CommentElement from "../comment-element";
import {UserInfo} from "../../common-info/user-info/UserInfo";

function CommentList(props: {
    comments: CommentInfo[],
    getUserInfoById: (userId: number) => Promise<UserInfo>
}) {
    const [previousComments, setPreviousComments] = useState<CommentInfo[]>(props.comments);
    if (props.comments !== previousComments) {
        setPreviousComments(props.comments);
    }
    const commentSection = previousComments.map((comment) => {
        return <CommentElement key={comment.id}
                               comment={comment}
                               userId={comment.commentUserId} getUserById={props.getUserInfoById}/>
    });

    return (
        <div className="comment-section">
            {commentSection}
        </div>
    );
}

export default CommentList;