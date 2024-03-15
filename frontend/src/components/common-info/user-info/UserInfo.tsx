import {PlantInfo} from "../plant-info/PlantInfo";

export interface UserInfo {
    id: number;
    imageUri?: string;
    username: string;
    name?: string | null;
    surname?: string | null;
    email: string;
    password?: string;
    plants?: PlantInfo[];
}