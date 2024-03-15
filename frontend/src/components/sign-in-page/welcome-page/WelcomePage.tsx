import React, {useState} from 'react'
import "./WelcomePage.scss"
import "../sign-in-page/SignInPage.scss"

import SignInHeader from "../sign-in-header/SignInHeader";
import InputField from "../input-field/InputField";
import {UserRequests} from "../../../server-requests/ServerRequests";

function WelcomePage() {
    function redirect() {
        window.location.href = new URL(window.location.href).searchParams.get("redirect_to") ?? "/"
    }

    const [passwordInputAppearanceChange, setPasswordInputAppearanceChange] = useState("");
    
    function handlePrinting() {
        setPasswordInputAppearanceChange("");

        setPromptVisibility(false);
    }

    let passwordInputRef = React.useRef<HTMLInputElement>(null)
    let promptDivRef = React.useRef<HTMLDivElement>(null);
    
    function setPromptVisibility(visible: boolean) {
        if (visible) {
            promptDivRef.current!.style.display = "flex";
        } else {
            promptDivRef.current!.style.display = "none";
        }
    }

    async function handleNext() {
        let passwordRef = passwordInputRef.current!;
        let passwordValue = passwordRef.value;

        let empty = false;
        promptDivRef.current!.innerText = "Пожалуйста, заполните все поля";
        if (passwordValue === "") {
            setPasswordInputAppearanceChange("red");
            empty = true;
        }

        setPromptVisibility(empty);

        if (!empty) {
            const email = new URL(window.location.href).searchParams.get("email");
            let result = await UserRequests.SignIn({
                email: email!,
                password: passwordValue
            });

            localStorage.setItem("auth-token", JSON.stringify({token: result.token}));
            redirect();
        }
    }

    let passwordText = "Пароль";
    let forgotPasswordText = "Забыли пароль?";

    return (
        <div className="welcome-page-body">
            <div className="sign-in-box">
                <div className="sign-in-header-wrap">
                    <SignInHeader text={"Добро пожаловать обратно"}/>
                </div>
                <div className="password-input">
                    <InputField type="password"
                                hasNext={ true }
                                switchNext={ handleNext }
                                onEnter={ handleNext }
                                onKeyDown={ handlePrinting }
                                inputFieldAppearanceChange={ passwordInputAppearanceChange }
                                inputRef={passwordInputRef}
                                placeholder={ passwordText }/>
                </div>
                <div className="prompt"
                     ref={ promptDivRef }
                     style={{ display: "none" }}>
                    Подсказка
                </div>
                <button className="forgot-password-button">
                    { forgotPasswordText }
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;