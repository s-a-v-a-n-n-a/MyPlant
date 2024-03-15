import React from 'react';
import './PlantsList.scss';
import PlantDesk from "../plant-desk";
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import {v4 as uuidv4} from "uuid";
import {BlogInfo} from "../../common-info/blog-info/BlogInfo";

function PlantsList(props: {
    articles: PlantInfo[];
    onDelete: (plantId: number) => void,
    getBlog: (plantId: number) => Promise<BlogInfo>,
    changePlant: (plantInfo: PlantInfo) => void
}) {
    console.log(props.articles)

    let plantComponents = props.articles.map((plantInfo) => {
        return <PlantDesk key={uuidv4()}
                          plant={plantInfo}
                          onDelete={props.onDelete}
                          getBlog={props.getBlog}
                          changePlant={props.changePlant}/>
    });

    return (
        // <div className="plants-list-wrapper">
            <div className="plants-list">
                { plantComponents }
            </div>
        // </div>
    );
}

export default PlantsList;