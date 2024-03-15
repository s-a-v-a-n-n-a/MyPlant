import React, {useEffect, useState} from 'react';
import './BlogPage.scss';
import {CommentInfo} from "../../common-info/comment-info/CommentInfo";
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";
import CommentForm from "../comment-form";
import CommentList from "../comment-list";
import UserData from "../../../server-requests/UserData";
import {
    PostBlogQueryPayload,
    PostCommentQueryPayload
} from "../../../server-requests/QueryPayload";

function BlogPage(props: {
    getBlog: (blogId: number) => Promise<PostBlogQueryPayload>,
    getComments: (blogId: number) => Promise<PostCommentQueryPayload[]>,
    setCommentState: (newComment: PostCommentQueryPayload, blogId: number) => void,
    getUserInfoById: (userId: number) => Promise<{username: string, email: string, id: number}>
}) {
    const currentUserData = UserData.whoAmI;
    const blogId = +(new URL(window.location.href).searchParams.get("id")!);
    const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null);

    const dataToBlog = (data: PostBlogQueryPayload) => {
        let blog : BlogInfo = {
            id: data.id,
            plantId: data.plant.id,
            title: data.title,
            content: data.content,
            snippet: data.snippet,
        }

        return blog;
    }

    const dataToComments = (data: PostCommentQueryPayload[]) => {
        let comments : CommentInfo[] = []
        for (let i = 0; i < data.length; i++) {
            comments = [
                ...comments,
                {
                    id: data[i].id,
                    blogId: data[i].blog!.id,
                    commentUserId: data[i].user!.id,
                    username: data[i].user!.username,
                    commentText: data[i].content
                }
            ]
        }

        return comments;
    }

    useEffect(() => {
        const getBlogById = async (blogId: number) => {
            props.getBlog(blogId).then(data => {
                let blog : BlogInfo = dataToBlog(data);
                setBlogInfo(blog);
            }).catch(err => {
                setBlogInfo(null);
                console.log(err.message);
            });
        }

        if (blogId) {
            getBlogById(blogId);
        }
    }, [props, blogId])

    const [comments, setComments] = useState<CommentInfo[]>([]); // TODO: change to undefined

    useEffect(() => {
        props.getComments(blogId!).then((data: PostCommentQueryPayload[]) => {
            setComments(dataToComments(data));
        }).catch(err => {
            setComments([]);
            console.log(err.message);
        });
    }, [props, blogId, currentUserData]);

    const addComment = (comment: PostCommentQueryPayload) => {
        const newComment = {
            id: comment.id,
            commentText: comment.content,
            commentUserId: UserData.whoAmI!.id,
            blogId: blogInfo!.id,
            username: UserData.whoAmI!.username,
            commentUserImageUri: UserData.whoAmI!.imageUri
        };

        setComments([
            ...comments,
            newComment
        ]);

        props.setCommentState(comment, blogInfo!.id);
    }

    return (
        <>
        {
            blogInfo && (comments || comments == null) &&
            <div className="blog-page-wrap">
                <div className="blog-content">
                    <div className="users-content">
                        <div className="blog-text-content">
                            <div className="blog-image"></div>
                            <div className="blog-header">{blogInfo.title}</div>
                            <div className="blog-text">{blogInfo.content}</div>
                        </div>
                        {
                            comments &&
                            <CommentList comments={comments} getUserInfoById={props.getUserInfoById}/>
                        }
                    </div>
                    {
                        currentUserData &&
                        <CommentForm userInfo={currentUserData} blogInfo={blogInfo}
                                     commentsNumber={comments.length}
                                     setCommentState={addComment}/>
                    }
                    {
                        currentUserData === null &&
                        <div className="comment-form-warning">Авторизуйтесь, чтобы оставить комментарий</div>
                    }
                </div>
            </div>
        }
        </>
    );
}

export default BlogPage;