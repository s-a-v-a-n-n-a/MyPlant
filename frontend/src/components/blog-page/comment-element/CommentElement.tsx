import React, {useEffect, useState} from 'react';
import './CommentElement.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faThumbsUp as faThumbsUpSolid,
    faThumbsDown as faThumbsDownSolid,
    faReply
} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import {UserInfo} from "../../common-info/user-info/UserInfo";
import {CommentInfo} from "../../common-info/comment-info/CommentInfo";
import UserPhoto from "../user-photo";
import UserData from "../../../server-requests/UserData";
import comments from "../../temporary-database/Comments";

function CommentElement(props: {
    comment: CommentInfo,
    userId: number,
    getUserById: (userId: number) => Promise<UserInfo>
}) {
    const userId = props.userId;

    const [liked, setLiked] = useState(false); // props.comment.usersLiked.includes(String(props.userId))
    const likedIcon = liked ? faThumbsUpSolid : faThumbsUp;

    const [disliked, setDisliked] = useState(false); // props.comment.usersDisliked.includes(String(props.userId))
    const dislikedIcon = disliked ? faThumbsDownSolid : faThumbsDown;


    const [userInfo, setUserInfo] = useState<UserInfo | null>(UserData.whoAmI ? UserData.whoAmI : null);

    // useEffect(() => {
    //     props.getUserById(userId).then(data => {
    //         setUserInfo(data);
    //     }).catch(err => {
    //         setUserInfo(null);
    //         console.log(err.message);
    //     });
    // }, [props, userId]);

    const changedLiked = () => {
        setLiked(liked => !liked);
    }

    const changedDisliked = () => {
        setDisliked(disliked => !disliked);
    }

    return (
        <>
            {
                // userInfo &&
                <div className="comment-element-wrap">
                    <UserPhoto userId={props.comment.commentUserId} imageUri={props.comment.commentUserImageUri}/>
                    <div className="main-comment-info">
                        <div className="username-wrap">{ props.comment.username}</div>
                        <div className="comment-text">{ props.comment.commentText }</div>
                    </div>
                    <div className="like-section">
                        <button className="reply-button">
                            <FontAwesomeIcon icon={ faReply } size="lg"/>
                        </button>
                        <button className="like-button" onClick={ changedLiked }>
                            <FontAwesomeIcon icon={ likedIcon } size="lg"/>
                        </button>
                        <button className="dislike-button" onClick={ changedDisliked }>
                            <FontAwesomeIcon icon={ dislikedIcon } size="lg"/>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default CommentElement;