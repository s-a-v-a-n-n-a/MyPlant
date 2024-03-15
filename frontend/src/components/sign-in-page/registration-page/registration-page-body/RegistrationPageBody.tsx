import React, {useState} from 'react';
import "./RegistrationPageBody.scss";

import InputField from "../../input-field";
import SignInHeader from "../../sign-in-header/SignInHeader";
import {UserRequests} from "../../../../server-requests/ServerRequests";


function RegistrationPageBody() {
    function redirect() {
        window.location.href = new URL(window.location.href).searchParams.get("redirect_to") ?? "/"
    }

    async function postUser(mail: string, login: string, password: string) {
        // временно
        // redirect();
        try {
            let params = {
                email: mail,
                username: login,
                password: password
            }
            const result = await UserRequests.SignUp(params);
            console.log(result);
            localStorage.setItem("auth-token", JSON.stringify({token: result.token}));
            redirect();
        } catch (e) {
            // TODO: draw server error page
            if (e instanceof Error) {
                console.log(e.message)
            }
        }
    }

    const [mainInputAppearanceChange, setMainInputAppearanceChange] = useState("");
    const [loginInputAppearanceChange, setLoginInputAppearanceChange] = useState("");
    const [passwordInputAppearanceChange, setPasswordInputAppearanceChange] = useState("");
    const [repeatPasswordInputAppearanceChange, setRepeatPasswordInputAppearanceChange] = useState("");

    function handlePrinting() {
        setPasswordInputAppearanceChange("");
        setRepeatPasswordInputAppearanceChange("");
    }

    function onMailEnter() {
        let loginInput = loginInputRef.current!;
        loginInput.focus();
    }
    function onLoginEnter() {
        let passwordInput = passwordInputRef.current!;
        passwordInput.focus();
    }

    function onPasswordEnter() {
        let repeatPasswordInput = repeatPasswordInputRef.current!;
        repeatPasswordInput.focus();
    }

    function setPromptVisibility(visible: boolean) {
        if (visible) {
            promptDivRef.current!.style.display = "flex";
        } else {
            promptDivRef.current!.style.display = "none";
        }
    }

    function onRepeatPasswordEnter() {
        let passwordInput = passwordInputRef.current!;
        let repeatPasswordInput = repeatPasswordInputRef.current!;

        let password = passwordInput.value;
        let repeatPassword = repeatPasswordInput.value;

        if (password !== repeatPassword) {
            promptDivRef.current!.innerText = "Не совпадают введённые пароли!"
            setPromptVisibility(true);

            setPasswordInputAppearanceChange("red");
            setRepeatPasswordInputAppearanceChange("red");
        } else {
            setPromptVisibility(false);

            let mailRef = mailInputRef.current!;
            let loginRef = loginInputRef.current!;

            let mail = mailRef.value;
            let login = loginRef.value;

            let empty = false;
            promptDivRef.current!.innerText = "Пожалуйста, заполните все поля";

            if (mail === "") {
                setMainInputAppearanceChange("red");
                empty = true;
            }

            if (login === "") {
                setLoginInputAppearanceChange("red");
                empty = true;
            }

            if (password === "") {
                setPasswordInputAppearanceChange("red");
                empty = true;
            }

            if (repeatPassword === "") {
                setRepeatPasswordInputAppearanceChange("red");
                empty = true;
            }

            setPromptVisibility(empty)

            if (!empty) {
                postUser(mail, login, password).then();
            }
        }
    }

    let mailInputRef = React.useRef<HTMLInputElement>(null)
    let loginInputRef = React.useRef<HTMLInputElement>(null)
    let passwordInputRef = React.useRef<HTMLInputElement>(null)
    let repeatPasswordInputRef = React.useRef<HTMLInputElement>(null)

    let promptDivRef = React.useRef<HTMLDivElement>(null)

    let mailText = "Почта";
    let loginText = "Логин";
    let passwordText = "Пароль";
    let repeatPasswordText = "Повторите пароль";


    return (
        <div className="RegistrationPageBody">
            <div className="sign-in-box">
                <div className="sign-up-header">
                    <SignInHeader text={"Регистрация"}/>
                </div>
                <div className="sign-up-mail-input">
                    <InputField type="text"
                                onEnter={ onMailEnter }
                                onKeyDown={ () => handlePrinting() }
                                inputRef={ mailInputRef }
                                placeholder={ mailText }
                                inputFieldAppearanceChange={ mainInputAppearanceChange }
                    />
                </div>
                <div className="sign-up-login-input">
                    <InputField type="text"
                                onEnter={ onLoginEnter }
                                onKeyDown={ () => handlePrinting() }
                                inputRef={ loginInputRef }
                                placeholder={ loginText }
                                inputFieldAppearanceChange={ loginInputAppearanceChange }
                    />
                </div>
                <div className="sign-up-password-input">
                    <InputField type="password"
                                onEnter={ onPasswordEnter }
                                onKeyDown={() => handlePrinting()}
                                inputRef={passwordInputRef}
                                placeholder={passwordText}
                                inputFieldAppearanceChange={ passwordInputAppearanceChange }
                    />
                </div>
                <div className="sign-up-repeat-password-input">
                    <InputField type="password"
                                onEnter={ onRepeatPasswordEnter }
                                onKeyDown={ () => handlePrinting()  }
                                inputRef={ repeatPasswordInputRef }
                                placeholder={ repeatPasswordText }
                                inputFieldAppearanceChange={ repeatPasswordInputAppearanceChange }
                    />
                </div>
                <div className="prompt"
                     ref={promptDivRef}
                     style={{ display: "none" }}>
                    Подсказка
                </div>
                <button className="sign-up-button"
                    onClick={ onRepeatPasswordEnter }>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
}

export default RegistrationPageBody;