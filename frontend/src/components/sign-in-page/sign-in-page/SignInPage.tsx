import React, { useState } from 'react'
import "./SignInPage.scss"

import SignInHeader from "../sign-in-header/SignInHeader";
import InputField from "../input-field/InputField";

function SignInPage() {
    const loginText = "Логин";
    const registrationText = "Регистрация";
    let promptDivRef = React.useRef<HTMLDivElement>(null);
    let loginInputRef = React.useRef<HTMLInputElement>(null);

    const [loginInputAppearanceChange, setLoginInputAppearanceChange] = useState("");
    const inputFieldParams = {
        type: "text",
        hasNext: true,
        switchNext: handleNext,
        inputRef: loginInputRef,
        onEnter: handleNext,
        onKeyDown: handlePrinting,
        inputFieldAppearanceChange: loginInputAppearanceChange,
        placeholder: loginText,
    };

    function moveToRegistration() {
        let old = new URL(window.location.href).searchParams.get("redirect_to") ?? "/";
        window.location.href = window.location.origin + '/sign-up/?redirect_to=' + encodeURIComponent(old);
    }

    function setPromptVisibility(visible: boolean) {
        if (visible) {
            promptDivRef.current!.style.display = "flex";
        } else {
            promptDivRef.current!.style.display = "none";
        }
    }

    function handlePrinting() {
        setLoginInputAppearanceChange("");

        setPromptVisibility(false);
    }

    function redirectToWelcomePage(email: string) {
        let old = new URL(window.location.href).searchParams.get("redirect_to") ?? "/";
        window.location.href = window.location.origin +
            '/welcome/?email=' + email + '&redirect_to=' + encodeURIComponent(old);
    }
    
    function handleNext() {
        let loginRef = loginInputRef.current;
        let loginValue = loginRef!.value;

        let empty = false;
        promptDivRef.current!.innerText = "Пожалуйста, заполните все поля";
        if  (loginValue === "") {
            setLoginInputAppearanceChange("red");
            empty = true;
        }

        setPromptVisibility(empty);

        if (!empty) {
            redirectToWelcomePage(loginValue);
        }
    }

    return (
        <div className="SignInPageBody">
            <div className="sign-in-box">
            <div className="sign-in-header-wrap">
                <SignInHeader text={"Войти"}/>
            </div>
            <div className="login-input">
                <InputField {...inputFieldParams}/>
            </div>
            <div className="prompt"
                 ref={promptDivRef}
                 style={{ display: "none" }}>
                Подсказка
            </div>
            <button className="registration-button"
                    onClick={() => moveToRegistration()}>
                { registrationText }
            </button>
            </div>
        </div>
    );
}

export default SignInPage;