import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faPlus} from '@fortawesome/free-solid-svg-icons';

import './ProfilePage.scss';
import PlantsList from "../plants-list";
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import NewPlantForm from "../new-plant-form";
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";
import ProfileInfoForm from "../profile-info-form";
import UserData from "../../../server-requests/UserData";
import {PostPlantQueryPayload, PutUserInfoQueryPayload} from "../../../server-requests/QueryPayload";

function ProfilePage(props: {
    getPlants: (userId: number) => Promise<PostPlantQueryPayload[] | undefined>,
    addPlant: (plant: PlantInfo) => void,
    deletePlant: (plantId: number) => void,
    getBlog: (plantId: number) => Promise<BlogInfo>,
    postUserInfo: (userInfo: PutUserInfoQueryPayload) => void,
    changePlant: (plantInfo: PlantInfo) => void,
    logout: (userId: number) => void
}) {
    const [loading, setLoading] = useState<boolean>(true);

    const userInfo = UserData.whoAmI;
    if (userInfo === null) {
        window.location.href = "/";
    }
    const [userPlants, setUserPlants] = useState<PlantInfo[] | null>(null);
    const [visibleFormComponent, setVisibleFormComponent] = useState(false);

    const dataToPlants = (data: PostPlantQueryPayload[]) => {
        let plants : PlantInfo[] = []
        for (let i = 0; i < data.length; i++) {
            plants = [
                ...plants,
                {
                    id: data[i].id,
                    userId: data[i].user.id,
                    userName: data[i].user.username!,
                    name: data[i].name,
                    age: data[i].age,
                    waterFrequency: data[i].waterFrequency,
                    nextWaterTime: data[i].nextWaterTime,
                    blogId: null
                }
            ]
        }

        return plants;
    }

    useEffect(() => {
        const getPlantsByUserId = async (userId: number) => {
            props.getPlants(userId).then(data => {
                if (data) {
                    console.log(data);
                    let plants : PlantInfo[] = dataToPlants(data);
                    setUserPlants(plants);
                    console.log(userPlants)
                    setLoading(false);
                } else {
                    console.log("Error when trying to get plants from db");
                }
            }).catch(err => {
                setUserPlants(null);
                setLoading(false);
                console.log(err.message);
            });
        }

        getPlantsByUserId(userInfo!.id);
    }, [props, userInfo])

    if (loading) {
        return (
            <div className="app-wrap">
                <div>Loading...</div>
            </div>
        );
    }

    const addPlant = (plant: PlantInfo) => {
        setVisibleFormComponent(visibleFormComponent => !visibleFormComponent);
        props.addPlant(plant);
    }

    const deletePlant = (plantId: number) => {
        props.deletePlant(plantId);
    }

    return (
        <div className="profile-page-wrap">
            <div className="left-profile-side">
                <ProfileInfoForm postUserInfo={props.postUserInfo}/>
                <div className="left-down">
                <button className="add-plant-button" onClick={() => {
                    setVisibleFormComponent(visibleFormComponent => !visibleFormComponent)
                }}>
                    <FontAwesomeIcon icon={ faPlus } size="2x" />
                </button>
                <button className="logout-button" onClick={() => {
                    props.logout(userInfo!.id);
                    window.location.href = new URL(window.location.href).searchParams.get("redirect_to") ?? "/"
                }}>
                    Выйти
                    <FontAwesomeIcon icon={ faArrowRight } size="lg" />
                </button>
                </div>
            </div>
            <div className="plants-info-wrap">
                <div className="plants-list-wrapper">
                    <div className="plants-list-header">
                        Мои растения
                    </div>
                    {
                        userPlants &&
                        <PlantsList articles={ userPlants }
                                    onDelete={ deletePlant }
                                    getBlog={ props.getBlog }
                                    changePlant={props.changePlant}/>
                    }
                    {
                        visibleFormComponent &&
                        <div className="new-plant-form-wrap">
                            <NewPlantForm createPlant={(plant: PlantInfo) => addPlant(plant)} userId={userInfo!.id}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;