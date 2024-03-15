import React, {useState, RefObject} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import "./InputField.scss";

interface InputParam extends React.InputHTMLAttributes<HTMLInputElement> {
    onEnter? : (text : string) => void; // callback
    inputRef? : RefObject<HTMLInputElement>;
    onKeyDown? : (event: React.KeyboardEvent<HTMLInputElement>) => void;
    hasNext? : boolean;
    switchNext? : (text : string) => void;
    inputFieldAppearanceChange? : string;
    type: string;
    placeholder : string;
}

function InputField(props: InputParam) {
    // const defaultInputClass = "input-field-container";

    let { onEnter, inputRef, onKeyDown, hasNext, switchNext, inputFieldAppearanceChange, type, placeholder } = props
    const inputAppearance = "input-field-container " + inputFieldAppearanceChange;
    const [text, setText] = useState('');

    const changeText = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    }
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // отменяет действие по умолчанию
            event.stopPropagation(); // отменяет диспетчеризацию события выше

            onEnter?.(text); // optional chaining
        } else {
            onKeyDown?.(event);
        }
    }

    return (
        <div className={ inputAppearance }>
            <input className="input-field"
                   ref={ inputRef }
                   type = { type }
                   placeholder={ placeholder }
                   onKeyDown={ (event) => handleEnter(event) }
                   onChange={ changeText }
            />
            {
                hasNext ?
                    <button className="button-next"
                            onClick={ () => switchNext!(text) }>
                        <FontAwesomeIcon icon={ faArrowRight } size="2x" />
                    </button> : null
            }
        </div>
    )
}

export default InputField;