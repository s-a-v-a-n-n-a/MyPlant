import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import "./ContentScreen.scss";

function ContentScreen(props: { onStart: () => void }) {
    const welcomeText = "Поделитесь своими растениями с миром!";
    const startText = "Начать";

    return (
        <div className="content-screen-wrap">
            <div className="content-info">
                <div className="content-header">{ welcomeText }</div>
                <button className="start-button" onClick={() => props.onStart()}>
                    <div className="start-text">{ startText }</div>
                    <div className="start-arrow"><FontAwesomeIcon icon={ faArrowRight } size="2x" /></div>
                </button>
            </div>
            <div className="decoration-screen-wrap">
                <div className="big-circle">
                    <img className="plant-image" alt="" style={{ backgroundImage: "url(assets/MainScreenPlant.jpg)"}}/>
                </div>
                <div className="small-circle">
                    <img className="plant-image" alt="" style={{ backgroundImage: "url(assets/MainScreenPlant.jpg)"}}/>
                </div>
                <div className="middle-circle">
                    <img className="plant-image" alt="" style={{ backgroundImage: "url(assets/MainScreenPlant.jpg)"}}/>
                </div>
            </div>
        </div>
    );
}

export default ContentScreen;