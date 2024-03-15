import React, {useEffect, useState} from "react";
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import './PlantDesk.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronRight, faArrowRight, faSeedling, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";

function countNextWaterTime(firstDate: Date, waterFrequency: number | undefined | null) {
    const realWaterFrequency = waterFrequency ? waterFrequency : 2;

    const nextDate = new Date(firstDate);
    const currentDate = new Date();
    const difference = currentDate.getDate() - nextDate.getDate();
    if (difference < 0) {
        return nextDate;
    }

    if (difference === 0) {
        return currentDate;
    }

    let newDate = new Date(nextDate);

    if (difference % realWaterFrequency !== 0) {
        newDate.setDate(newDate.getDate() + difference / realWaterFrequency + 1);
        return newDate;
    }

    newDate.setDate(newDate.getDate() + difference / realWaterFrequency);
    return new Date(nextDate.getDate() + difference / realWaterFrequency);
}

function PlantDesk(props: {
    plant: PlantInfo,
    onDelete: (plantId: number) => void,
    getBlog: (blogId: number) => Promise<BlogInfo>,
    changePlant: (plantInfo: PlantInfo) => void
}) {
    // let blogId = props.plant.blogId;
    const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null); //: BlogInfo | null = props.plant.blogId ? props.getBlog(props.plant.blogId) : null;

    const [rolledUp, setRolledUp] = useState(true);
    const rolledIcon = rolledUp ? faChevronRight : faChevronDown;

    useEffect(() => {
        const getBlogById = async () => {
            console.log(props.plant.id);
            props.getBlog(props.plant.id).then(data => {
                setBlogInfo(data);
            }).catch(err => {
                setBlogInfo(null);
                console.log(err.message);
            });
        }

        getBlogById();
    }, [props])

    const changedRolledState = () => {
        setRolledUp(rolledUp => !rolledUp);
    }

    const resetWaterDate = () => {
        const newPlant: PlantInfo = {
            ...props.plant,
            nextWaterTime: new Date()
        }

        props.changePlant(newPlant);
    }

    const gotoBlog = () => {
        if (blogInfo) {
            window.location.href = window.location.origin + "/test-person-info/blog?id=" + blogInfo.id;
        }
    }

    const plantText = "Возраст: " + (props.plant.age ?  props.plant.age : "unknown") + "\nЧастота полива: " +
        (props.plant.waterFrequency ? props.plant.waterFrequency + " дней" : "2 дня") + "\nСледующий полив: " +
        (props.plant.nextWaterTime ?
            countNextWaterTime(props.plant.nextWaterTime, props.plant.waterFrequency).toLocaleDateString()
            : new Date().toLocaleDateString());

    return (
        <>
            {
                (blogInfo === null || blogInfo) &&
                <div className="plant-desk-wrap">
                    <button className="rolling-button" onClick={changedRolledState}>
                        <FontAwesomeIcon className="roll-icon" icon={ rolledIcon } size="5x" />
                    </button>
                    <div className="plant-info-wrap">
                        <div className="plant-info">
                            {
                                props.plant.imageUri &&
                                <div className="plant-photo"
                                     style={{ backgroundImage: "url(assets/" + props.plant.imageUri + ".jpg)" }}>
                                </div>
                            }
                            {
                                (props.plant.imageUri === undefined) &&
                                <div className="plant-photo">
                                    <FontAwesomeIcon icon={ faSeedling } size="4x" />
                                </div>
                            }
                            <div className="main-plant-info">
                                <div className="header-text">{ props.plant.name }</div>
                                <div className="plant-text"> { plantText } </div>
                                <button className="reset-watering-button"
                                        onClick={resetWaterDate}>
                                    Сбросить полив
                                </button>
                            </div>
                            <button className="delete-plant-button" onClick={() => props.onDelete(props.plant.id)}>
                                <FontAwesomeIcon icon={ faTrashCan } size="3x" />
                            </button>
                        </div>
                        <div className="additional-plant-info-wrap">
                        {
                            !rolledUp &&
                            <div className="additional-plant-info">
                                {/* Add text snippet and blogUri button */}
                                {   blogInfo &&
                                    <>
                                        <div className="plant-text-snippet">
                                            {blogInfo.snippet}
                                        </div>
                                        <button className="goto-blog-button"
                                                onClick={gotoBlog}>
                                            К записи
                                            <FontAwesomeIcon icon={faArrowRight} size="xs"/>
                                        </button>
                                    </>
                                }
                                <button className="add-blog-button" onClick={() => {
                                    window.location.href =
                                        "http://localhost:3000/test-person-info/change-blog?id=" + props.plant.id
                                        + "&name=" + props.plant.name + (blogInfo ? ("&blogId=" + blogInfo!.id) : "");
                                }}>
                                    Изменить историю растения
                                </button>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default PlantDesk;