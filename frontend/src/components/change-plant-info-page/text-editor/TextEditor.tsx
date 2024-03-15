import React, {RefObject, useState} from 'react';
import './TextEditor.scss';

function TextEditor(props: {text: string | null, textareaRef: RefObject<HTMLTextAreaElement>}) {
    const [blogText, setBlogText] = useState(props.text ? props.text! : "");
    const rows = props.text ? props.text.length / 50 + 1 : 2;

    const onTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setBlogText(event.target.value);
        if (props.textareaRef) {
            props.textareaRef.current!.style.height = "0px";
            const scrollHeight = props.textareaRef.current!.scrollHeight;
            props.textareaRef.current!.style.height = scrollHeight + "px";

            props.textareaRef.current!.rows = scrollHeight;
        }
    }

    return (
        <textarea className="change-text"
                  value={ blogText }
                  ref={ props.textareaRef }
                  rows={ rows }
                  placeholder={"Расскажите о своём растении!"}
                  onChange={(event) => onTextChange(event)}/>
    );
}

export default TextEditor;