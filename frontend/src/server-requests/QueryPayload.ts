import {UserInfo} from "../components/common-info/user-info/UserInfo";
import {PlantInfo} from "../components/common-info/plant-info/PlantInfo";

export interface PostSignUpQueryPayload {
    email: string
    username: string
    password: string
}

export interface PostSignInQueryPayload {
    email: string
    password: string
}

export interface PutUserInfoQueryPayload {
    id: number;
    imageUri?: string;
    username: string;
    name?: string | null;
    surname?: string | null;
    email: string;
    password?: string;
}

export interface PostPlantQueryPayload {
    id: number;
    // userId: number;
    // username?: string;
    imageUri?: string | null;
    name: string;
    age?: number | null;
    waterFrequency?: number | null;
    nextWaterTime: Date;
    // blogId?: number | null;
    user: PutUserInfoQueryPayload;
}


export interface GetPlantsQueryPayload {

}
export interface PutBlogQueryPayload {
    id: number;
    userId: number;
    username?: string;
    imageUri?: string | null;
    name: string;
    age?: number | null;
    waterFrequency?: number | null;
    nextWaterTime: Date;
    blogId?: number | null;
}

export interface PostBlogQueryPayload {
    user: PutUserInfoQueryPayload;
    id: number;
    // URL: string;
    title: string;
    content: string;
    snippet: string;
    plant: PostPlantQueryPayload;
    // plantId: number;
}

export interface PostCommentQueryPayload {
    id: number;
    content: string;
    indexNumber: number;
    user?: PutUserInfoQueryPayload;
    blog?: PostBlogQueryPayload;
}