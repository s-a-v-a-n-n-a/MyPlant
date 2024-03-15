import React, {useRef, useState} from 'react';
import './ProfileInfoForm.scss';
import ProfileImage from "../profile-image";
import {UserInfo} from "../../common-info/user-info/UserInfo";
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import UserData from "../../../server-requests/UserData";
import {PutUserInfoQueryPayload} from "../../../server-requests/QueryPayload";

function ProfileInfoForm(props: {postUserInfo: (userInfo: PutUserInfoQueryPayload) => void}) {
    const userInfo = UserData.whoAmI;

    let nameContainerRef = useRef<HTMLTextAreaElement>(null);
    let surnameContainerRef = useRef<HTMLTextAreaElement>(null);
    let loginContainerRef = useRef<HTMLTextAreaElement>(null);
    let emailContainerRef = useRef<HTMLTextAreaElement>(null);

    const [name, setName] = useState(userInfo!.name ? userInfo!.name : "");
    const [surname, setSurname] =useState(userInfo!.surname ? userInfo!.surname : "");
    const [login, setLogin] = useState(userInfo!.username ? userInfo!.username : "");
    const [email, setEmail] = useState(userInfo!.email ? userInfo!.email : "");

    const onNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(event.target.value);
    }

    const onSurnameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSurname(event.target.value);
    }

    const onLoginChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLogin(event.target.value);
    }

    const onEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    }

    return (
        <div className="profile-info">
            <ProfileImage imageUri={userInfo!.imageUri}/>
            <textarea rows={ 1 } maxLength={ 20 }
                      className="info-input" placeholder="Имя"
                      value={name} onChange={onNameChange}
                      ref={nameContainerRef}/>
            <textarea rows={ 1 } maxLength={ 20 }
                      className="info-input" placeholder="Фамилия"
                      value={surname} onChange={onSurnameChange}
                      ref={surnameContainerRef}/>
            <textarea rows={ 1 } maxLength={ 20 }
                      className="info-input" placeholder="Логин"
                      value={login} onChange={onLoginChange}
                      ref={loginContainerRef}/>
            <textarea rows={ 1 } maxLength={ 50 }
                      className="info-input" placeholder="Почта"
                      value={email} onChange={onEmailChange}
                      ref={emailContainerRef}/>
            <button className="save-button" onClick={() => props.postUserInfo({
                ...userInfo!,
                username: login.length > 0 ? login : userInfo!.username,
                name: name.length > 0 ? name : null,
                surname: surname.length > 0 ? surname : null,
                email: email.length > 0 ? email : userInfo!.email
            })}>Сохранить</button>
        </div>
    );
}

export default ProfileInfoForm;