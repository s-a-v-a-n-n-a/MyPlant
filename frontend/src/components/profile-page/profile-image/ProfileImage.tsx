import React from 'react';
import './ProfileImage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

function ProfileImage(props: {imageUri: string | undefined}) {
    return (
        <>
            <div className="profile-photo">
                {
                    props.imageUri &&
                    <div className="photo"
                         style={{ backgroundImage: "url(assets/" + props.imageUri + ".jpg)" }}/>
                }
                {
                    (props.imageUri === undefined) &&
                    <div className="photo">
                        <FontAwesomeIcon icon={ faUser } size="4x" />
                    </div>
                }
            </div>
        </>
    );
}

export default ProfileImage;