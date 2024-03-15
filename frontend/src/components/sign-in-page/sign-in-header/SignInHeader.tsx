import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import "./SignInHeader.scss";

function SignInHeader(props: { text: any; }) {
    const { text } = props

    return (
        <div className="sign-in-container">
            <button className="return-button"
                    onClick={ () => window.history.back() }>
                <FontAwesomeIcon icon={ faArrowLeft } size="lg" />
            </button>
            <div className="sign-in-header">
                { text }
            </div>
        </div>
    )
}

export default SignInHeader;