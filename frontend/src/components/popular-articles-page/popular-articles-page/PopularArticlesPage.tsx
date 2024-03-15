import React, {useEffect, useState} from 'react';
import './PopularArticlesPage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import ArticlePreview from "../article-preview";
import {v4 as uuidv4} from "uuid";
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";
import {UserInfo} from "../../common-info/user-info/UserInfo";
import UserData from "../../../server-requests/UserData";
import {PostBlogQueryPayload, PostCommentQueryPayload} from "../../../server-requests/QueryPayload";
import {CommentInfo} from "../../common-info/comment-info/CommentInfo";

function PopularArticlesPage(props: {
    getPopularBlogs: () => Promise<PostBlogQueryPayload[]>,
    getBlog: (blogId: number) => Promise<BlogInfo>,
    getUser: () => UserInfo | null
}) {
    const dataToBlogs = (data: PostBlogQueryPayload[]) => {
        let blogs : BlogInfo[] = []
        for (let i = 0; i < data.length; i++) {
            blogs = [
                ...blogs,
                {
                    id: data[i].id,
                    plantId: data[i].plant.id,
                    title: data[i].title,
                    content: data[i].content,
                    snippet: data[i].snippet,
                    username: data[i].user.username,
                    plantName: data[i].plant.name
                }
            ]
        }

        return blogs;
    }

    const [articles, setArticles] = useState<BlogInfo[] | null>(null);
    useEffect(() => {
        const plantsGetter = async () => {
            props.getPopularBlogs().then(data => {
                console.log(data);
                setArticles(dataToBlogs(data));
            });
        }

        plantsGetter();
    }, [props]);

    const user = UserData.whoAmI;

    const getPlantsComponents = (plants: BlogInfo[]) => {
        return plants.map((plantInfo) => {
            console.log(plantInfo)
            return <div className="article-preview-desk"><ArticlePreview key={uuidv4()}
                                                                         blog={plantInfo}/></div>
        });
    }

    return (
        articles &&
        <div className="popular-articles-page-wrap">
          <div className="articles-decoration-side">
              <div className="popular-articles-big-circle">
                  <img className="plant-image" alt="" style={{ backgroundImage: "url(assets/MainScreenPlant.jpg)"}}/>
              </div>
              <div className="popular-articles-small-circle">
                  <img className="plant-image" alt="" style={{ backgroundImage: "url(assets/MainScreenPlant.jpg)"}}/>
              </div>
              <div className="popular-articles-middle-circle">
                  <img className="plant-image" alt="" style={{ backgroundImage: "url(assets/MainScreenPlant.jpg)"}}/>
              </div>
            <button className="my-articles-button" onClick={() => {
                if (user) {
                    window.location.href = window.location.origin + '/test-person-info';
                } else {
                    let old = new URL(window.location.href).searchParams.get("redirect_to") ?? "/test-person-info";
                    window.location.href = window.location.origin + '/sign-in/?redirect_to=' + encodeURIComponent(old);
                }
            }}>
                <div className="my-articles-button-text">К моим записям</div>
                <div className="start-arrow"><FontAwesomeIcon icon={ faArrowRight } size="1x" /></div>
            </button>
          </div>
          <div className="popular-articles-list-wrap">
              <div className="popular-articles-header">
                  Популярные записи
              </div>
              {
                  articles.length > 0 ? <div className="plants-articles-list-wrap">
                          { getPlantsComponents(articles) }
                  </div> : <div className="articles-preview-text">Пока нет ни одной записи...</div>
              }
          </div>
        </div>
    );
}

export default PopularArticlesPage;