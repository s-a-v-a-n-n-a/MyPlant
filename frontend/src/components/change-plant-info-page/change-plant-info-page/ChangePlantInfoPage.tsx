import React, {useState, useRef, useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import './ChangePlantInfoPage.scss';
import '../../blog-page/blog-page/BlogPage.scss';
import TextEditor from "../text-editor";
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";

function ChangePlantInfoPage(props: {
    onChange: (blogId: number | null, newBlog: BlogInfo) => void,
    getBlog: (blogId: number) => Promise<BlogInfo>
}) {
    const plantId = +(new URL(window.location.href).searchParams.get("id")!);
    const blogIdParam = new URL(window.location.href).searchParams.get("blogId");
    const blogId: number | null = blogIdParam ? +blogIdParam : null;
    const blogName = new URL(window.location.href).searchParams.get("name");
    const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null);

    useEffect(() => {
        const getBlogById = async (blogId: number) => {
            props.getBlog(blogId).then(data => {
                setBlogInfo(data);
            }).catch(err => {
                console.log(err.message);
            });
        }

        if (blogId) {
            getBlogById(blogId);
        } else {
            setBlogInfo({
                id: new Date().getTime(),
                title: blogName!,
                plantId: plantId!,
                // URL: "/test-person-info/blog",
                content: "",
                snippet:""
            })
        }
    }, [props, blogName, blogId, plantId])

    let textRef = useRef<HTMLTextAreaElement>(null);

    return (
        blogInfo  &&
        <div className="change-page-wrap">
            <div className="blog-content">
                <div className="users-content">
                    <div className="blog-text-content">
                        <div className="blog-image"></div>
                        <div className="blog-header">{ blogInfo.title }</div>
                        <TextEditor text={blogInfo ? blogInfo.snippet : ""} textareaRef={textRef}/>
                    </div>
                </div>
                <div className="handle-changes-buttons">
                    <button className="accept-button" onClick={ () => {
                        props.onChange(blogId, {
                            ...blogInfo,
                            content: textRef.current!.value,
                            snippet: textRef.current!.value.slice(0, 20)
                        });
                        window.history.back();
                    } }>
                        Сохранить
                    </button>
                    <button className="decline-button" onClick={ () => window.history.back() }>
                        Отменить изменения
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePlantInfoPage;