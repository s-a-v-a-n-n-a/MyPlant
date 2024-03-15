import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* npm install --save-dev @types/react-router-dom */
import "./App.scss"
import "../../colors.scss"

import HomePage from "../home-page/home-page";
import SignInPage from "../sign-in-page/sign-in-page";
import WelcomePage from "../sign-in-page/welcome-page/WelcomePage";
import RegistrationPageBody from "../sign-in-page/registration-page/registration-page-body/RegistrationPageBody";
import ProfilePage from "../profile-page/profile-page";
import BlogPage from "../blog-page/blog-page";
import ChangePlantInfoPage from "../change-plant-info-page/change-plant-info-page";
import {PlantInfo} from "../common-info/plant-info/PlantInfo";
import PopularArticlesPage from "../popular-articles-page/popular-articles-page";
import {UserInfo} from "../common-info/user-info/UserInfo";
import {CommentInfo} from "../common-info/comment-info/CommentInfo";
import {BlogInfo} from "../common-info/blog-info/BlogInfo";
import UserData from "../../server-requests/UserData";
import {UserRequests} from "../../server-requests/ServerRequests";
import {
    PostBlogQueryPayload,
    PostCommentQueryPayload,
    PostPlantQueryPayload,
    PutUserInfoQueryPayload
} from "../../server-requests/QueryPayload";

const URL = 'http://localhost:8080';

function App() {
    const [loading, setLoading] = useState(true);

    const [currentUserInfo] =
        useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem("auth-token");
            console.log(token);

            try {
                if (token) {
                    const result = await UserRequests.WhoAmI(JSON.parse(token)["token"]);
                    UserData.whoAmI = result;
                } else {
                    UserData.whoAmI = null;

                }
            } catch(err: any) {
                UserData.whoAmI = null;
                setLoading(false);
                console.log(err.message);
                localStorage.removeItem("auth-token");
            }
            setLoading(false);
            // fetch(URL + '/users/auth/signup')
            //     .then(res => {
            //         if (!res.ok) {
            //             throw Error('Error fetching users data');
            //         }
            //         return res.json();
            //     })
            //     .then(data => {
            //         if (token) {
            //             UserData.whoAmI = data;
            //         } else {
            //             UserData.whoAmI = null;
            //         }
            //         setLoading(false);
            //     })
            //     .catch(err => {
            //         UserData.whoAmI = null;
            //         setLoading(false);
            //         console.log(err.message);
            //     });
        };

        fetchData();
    }, []);

    const getToken = () => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        return token;
    }
    const getPlants = async () => {
        return await UserRequests.GetPlants().then((response: PlantInfo[]) => {
            return response;
        });
    }

    if (loading) {
        return (
            <div className="app-wrap">
                <div>Loading...</div>
            </div>
        );
    }

    const addPlant = async (newPlant: PlantInfo) => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        await UserRequests.PostPlant(newPlant, token!).then(() => window.location.reload());
    }

    const deletePlant = async (plantId: number) => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        await UserRequests.DeletePlant(token!, plantId).then(() => window.location.reload());
    }

    const changePlantText = async (blogId: number | null, newBlog: BlogInfo) => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        if (blogId === null) {
            console.log(newBlog.plantId);
            await UserRequests.PostBlog(token!, newBlog, newBlog.plantId);
        } else {
            await UserRequests.PutBlog(token!, newBlog, blogId);
        }
    }

    const addComment = async (comment: PostCommentQueryPayload, blogId: number) => {
        await UserRequests.AddComment(getToken()!, comment, blogId);
    }

    const getUserInfoById = (userId: number) => {
        return fetch(`http://localhost:8000/users/${userId}`)
        .then(res => {
            if (!res.ok) {
                throw Error('Error fetching users data');
            }
            return res.json();
        })
        .then((data: {username: string, email: string, id: number}) => {
            console.log(data);
            return data;
        });
    }

    const getCurrentUser = () => {
        return currentUserInfo;
    }

    const getBlogInfoById = async (blogId: number) => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        return await UserRequests.GetBlogById(token!, blogId);
    }

    // const getBlogs = async () => {
    //     return await UserRequests.GetBlogs();
    // }
    //
    // const getPlantById = async (plantId: string) => {
    //     return await UserRequests.GetPlant(plantId);
    // }

    const getCommentsByBlogId = async (blogId: number) => {
        return await UserRequests.GetCommentsByBlogId(getToken()!, blogId);
    }

    const getPlantsByUserId = async (userId: number) => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        return await UserRequests.GetUserPlants(token!).then((response: PostPlantQueryPayload[]) => {
            return response;
        });
    }

    const putUserInfo = async (userInfo: PutUserInfoQueryPayload) => {
        await UserRequests.PutInfo(getToken()!, userInfo, userInfo.id);
    }

    const changePlant = async (plantInfo: PlantInfo) => {
        await UserRequests.PutPlant(plantInfo, plantInfo.id).then(() => {
            window.location.reload();
        });
    }

    const getPopularBlogs = async (): Promise<PostBlogQueryPayload[]> => {
       return await UserRequests.GetPopularBlogs();
    }

    const getBlogInfo = async (id: number) => {
        return await UserRequests.GetBlogInfo(id);
    }

    const logout = async () => {
        let token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        token = JSON.parse(token)["token"];
        localStorage.removeItem("auth-token");
        // window.location.reload();
        await UserRequests.LogOut(token!);
    }

    return (
        <div className="app-wrap">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path='/welcome' element={<WelcomePage/>}/>
                    <Route path="/sign-up" element={<RegistrationPageBody/>}/>
                    <Route path="/test-person-info"
                           element={<ProfilePage addPlant={addPlant}
                                                 deletePlant={deletePlant}
                                                 getPlants={getPlantsByUserId}
                                                 getBlog={getBlogInfoById}
                                                 postUserInfo={putUserInfo}
                                                 changePlant={changePlant}
                                                 logout={logout}/>}/>
                    <Route path="/test-person-info/blog"
                           element={<BlogPage getBlog={getBlogInfo}
                                              getComments={getCommentsByBlogId}
                                              setCommentState={
                               (newComment: PostCommentQueryPayload, blogId: number) => addComment(newComment, blogId)
                           }
                                              getUserInfoById={getUserInfoById}/>}/>
                    <Route path="/popular-articles" element={<PopularArticlesPage getPopularBlogs={getPopularBlogs}
                                                                                  getBlog={getBlogInfo}
                                                                                  getUser={getCurrentUser}
                    />}/>
                    <Route path="/test-person-info/change-blog"
                           element={<ChangePlantInfoPage onChange={changePlantText}
                                                         getBlog={getBlogInfoById} />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
