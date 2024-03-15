import {Routing} from "./Routing";
import {
    PostBlogQueryPayload,
    PostCommentQueryPayload,
    PostPlantQueryPayload,
    PostSignInQueryPayload,
    PostSignUpQueryPayload,
    PutUserInfoQueryPayload
} from "./QueryPayload";
import {PlantInfo} from "../components/common-info/plant-info/PlantInfo";
import {BlogInfo} from "../components/common-info/blog-info/BlogInfo";

const URL = "http://localhost:8080"

export default class ServerRequests {

    protected static request(url: string, options = {}) {
        return fetch(url, options).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status} ${response.body}`);
            }
            console.log(response);
            return response.json();
        });
    }
}

export class UserRequests extends ServerRequests {
    static async SignUp(payload: PostSignUpQueryPayload) {
        let reqPath = URL + "/users/auth/signup"

        return await this.request(reqPath, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    static async SignIn(payload: PostSignInQueryPayload) {
        let reqPath = URL + "/users/auth/signin";

        return await this.request(reqPath, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    static async WhoAmI(token: string) {
        let reqPath = URL + "/users/auth/signup";

        // const headers = {'Authorization': token};

        return await this.request(reqPath, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    }

    static async LogOut(token: string) {
        let reqPath = URL + "/users/logout";

        return await this.request(reqPath, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        });
    }

    static async PutInfo(token: string, payload: PutUserInfoQueryPayload, id: number) {
        const reqPath = URL + `/users/${id}`;
        return await this.request(reqPath, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': token
            },
        body: JSON.stringify(payload)});
    }

    static async PutPlant(payload: PlantInfo, id: number) {
        let reqPath = Routing.get("plants").get("plantInfo", String(id));
        return await this.request(reqPath, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(payload)
        });
    }

    static async GetUserPlants(token: string) {
        let reqPath = URL + `/users/plants`;
        console.log("GetUserPlants")
        console.log(reqPath);

        return await this.request(reqPath, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
    }

    static async GetPlants() {
        let reqPath = URL + "/plants";

        return await this.request(reqPath, {
            method: 'GET'
        });
    }

    static async GetPlant(id: string) {
        let reqPath = Routing.get("plants").get("get", id);

        return await this.request(reqPath, {
            method: 'GET'
        });
    }
    static async PostPlant(payload: PlantInfo, token: string) {
        // let reqPath = Routing.get("plants").get("add");
        let reqPath = URL + "/plants";
        return await this.request(reqPath, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': token
            },
            body: JSON.stringify(payload)
        });
    }

    static async PutPlantBlogId(id: number, newBlogId: number) {
        let reqPath = Routing.get("plants").get("putBlogId", String(id));
        return await this.request(reqPath, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({"blogId": newBlogId})
        });
    }

    static async DeletePlant(token: string, id: number) {
        // let reqPath = Routing.get("plants").get("deletePlant", String(id));
        let reqPath = URL + `/plants/${id}`;
        console.log(reqPath);
        return await this.request(reqPath, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        });
    }

    static async GetPopularBlogs() {
        let reqPath = URL + `/blogs/popular`;
        return await this.request(reqPath, {
            method: 'GET'
        });
    }
    static async PostBlog(token: string, payload: BlogInfo, plantId: number) {
        // let reqPath = Routing.get("blogs").get("add");
        let reqPath = URL + `/blogs/${plantId}`;
        console.log(reqPath);
        return await this.request(reqPath, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': token
            },
            body: JSON.stringify(payload)
        });
    }

    static async PutBlog(token: string, payload: BlogInfo, id: number) {
        let reqPath = URL + `/blogs/${id}`;
        return await this.request(reqPath, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': token
            },
            body: JSON.stringify(payload)
        });
    }

    static async GetBlogInfo(id: number) {
        const reqPath = URL + `/blogs/info/${id}`;
        return await this.request(reqPath, {
            method: 'GET'
        });
    }

    static async GetBlogById(token: string, id: number) {
        let reqPath = URL + `/blogs/${id}`;
        return await this.request(reqPath, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
    }

    // static async GetComments() {
    //     let reqPath = Routing.get("comments").get("getComments");
    //     return await this.request(reqPath, {
    //         method: 'GET'
    //     });
    // }

    static async GetCommentsByBlogId(token: string, blogId: number) {
        const reqPath = URL + `/blogComments?blogId=${blogId}`
        return await this.request(reqPath, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
    }

    static async AddComment(token: string, payload: PostCommentQueryPayload, blogId: number) {
        // let reqPath = Routing.get("comments").get("addComment");
        const reqPath = URL + `/blogComments/${blogId}`;
        return await this.request(reqPath, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': token
            },
            body: JSON.stringify(payload)
        });
    }
}
