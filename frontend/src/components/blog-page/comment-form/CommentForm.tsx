import React, {useState} from 'react';
import './CommentForm.scss';
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";
import {UserInfo} from "../../common-info/user-info/UserInfo";
import {PostCommentQueryPayload} from "../../../server-requests/QueryPayload";

function CommentForm(props: {
    userInfo: UserInfo,
    blogInfo: BlogInfo,
    commentsNumber: number,
    setCommentState: (newComment: PostCommentQueryPayload) => void
}) {
    const [inputValue, setInputValue] = useState("");
    const addComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return;
        }

        const newComment : PostCommentQueryPayload = {
            id: new Date().getTime(),
            content: inputValue,
            indexNumber: props.commentsNumber + 1
        }

        props.setCommentState(newComment);
        setInputValue("");
    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <input type="text"
               className="add-comment-input"
               placeholder="Напишите свой комментарий"
               value={inputValue}
               onChange={(event) => inputChange(event)}
               onKeyDown={(event) => addComment(event)}
        />
    );
}

export default CommentForm;