import React from 'react';
import './UserPhoto.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

function UserPhoto(props: {imageUri: string | undefined, userId: number}) {
    return (
        <>
        {
            props.imageUri !== undefined &&
                <div className="user-photo"
                     style={{ backgroundImage: "url(assets/" +
                             props.userId + "/" + props.imageUri + ".jpg)" }}/>
        }
        {
            (props.imageUri === undefined) &&
            <button className="user-photo">
                <FontAwesomeIcon icon={ faUser } size="lg"/>
            </button>
        }
        </>
    );
}

export default UserPhoto;