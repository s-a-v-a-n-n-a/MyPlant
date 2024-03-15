import React from 'react';
import "./NavigationBar.scss"

import UserData from "../../../server-requests/UserData";

function NavigationBar() {
    const userInfo = UserData.whoAmI;
    const signInButtonText = "Войти";
    const profilePageText = "Личный кабинет";

    const moveToSignInPage = () => {
        let old = window.location.href;
        window.location.href = window.location.origin + '/sign-in/?redirect_to=' + encodeURIComponent(old);
    }

    const moveToProfilePage = () => {
        window.location.href = window.location.origin + '/test-person-info';
    }

    return (
        <div className="navigation-wrap">
            <div className="right-side-elements-wrap">
                {
                    userInfo === null &&
                    <button className="nav-sign-in-button"
                            onClick={() => moveToSignInPage()}>{signInButtonText}</button>
                }
                {
                    userInfo &&
                    <button className="nav-sign-in-button"
                            onClick={() => moveToProfilePage()}>
                        {profilePageText}
                    </button>
                }
            </div>
        </div>
    );
}

export default NavigationBar;