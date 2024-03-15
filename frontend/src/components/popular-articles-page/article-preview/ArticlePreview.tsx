import React, {useEffect, useState} from 'react';
import './ArticlePreview.scss';
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faSeedling} from "@fortawesome/free-solid-svg-icons";
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";

function ArticlePreview(props: {blog: BlogInfo}) {
    const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(props.blog);

    return (
        <>
            {
                blogInfo &&
                <div className="article-preview-wrap">
                    <div className="plant-info">
                        {
                            props.blog.plantImageUri &&
                            <div className="plant-photo"
                                 style={{ backgroundImage: "url(assets/" + props.blog.plantImageUri + ".jpg)" }}></div>
                        }
                        {
                            (props.blog.plantImageUri === undefined) &&
                            <div className="plant-photo">
                                <FontAwesomeIcon icon={ faSeedling } size="4x" />
                            </div>
                        }
                        <div className="main-plant-info">
                            <div className="author-name-text">{ props.blog.username }</div>
                            <div className="plant-name-text">{ props.blog.plantName }</div>
                            {blogInfo && <div className="article-snippet-text"> { blogInfo.snippet } </div>}
                        </div>
                    </div>
                    <button className="goto-blog-button" onClick={() => {
                        if (blogInfo) {
                            window.location.href = window.location.origin + "/test-person-info/blog?id=" + props.blog.id;
                        }
                    }}>
                        К записи
                        <FontAwesomeIcon icon={faArrowRight} size="xs"/>
                    </button>
                </div>
            }
        </>
    );
}

export default ArticlePreview;