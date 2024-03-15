import React, {useRef} from 'react';
import './NewPlantForm.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {PlantInfo} from "../../common-info/plant-info/PlantInfo";
import {v4 as uuidv4} from "uuid";

function NewPlantForm(props: {createPlant: (plant: PlantInfo) => void, userId: number}) {
    let nameInputRef = useRef<HTMLInputElement>(null);
    let ageInputRef = useRef<HTMLInputElement>(null);
    let waterFrequencyInputRef = useRef<HTMLInputElement>(null);

    let promptDivRef = React.useRef<HTMLDivElement>(null);

    const changePromptVisibility = (visibility: string) => {
        promptDivRef.current!.style.display = visibility;
    }
    const sendPlantInfo = () => {
        if (nameInputRef.current!.value === "") {
            promptDivRef.current!.innerText = "Пожалуйста, введите хотя бы имя";
            nameInputRef.current!.classList.add("red");

            changePromptVisibility("flex");

            return;
        }

        const newPlant: PlantInfo = {
            id: new Date().getTime(),
            userId:  props.userId,
            name: nameInputRef.current!.value,
            age: ageInputRef.current!.value !== "" ? parseFloat(ageInputRef.current!.value) : null,
            waterFrequency: waterFrequencyInputRef.current!.value !== "" ?
                parseInt(waterFrequencyInputRef.current!.value) : null,
            nextWaterTime: new Date(),
            blogId: null
        };

        props.createPlant(newPlant);
    }

    function handlePrinting() {
        nameInputRef.current!.classList.remove("red");
        changePromptVisibility("none");
    }

    return (
        <div className="plant-form-wrap">
            <div className="main-info-form">
                <div className="add-plant-photo">
                    Фото вашего растения
                </div>
                <div className="plant-info-input-wrap">
                    <input type="text"
                           className="plant-info-input required-input"
                           placeholder="Название"
                           ref={nameInputRef}
                           onClick={handlePrinting}
                           autoFocus />
                    <input type="number" step="0.1"
                           className="plant-info-input"
                           placeholder="Возраст"
                           ref={ageInputRef}/>
                    <input type="number"
                           className="plant-info-input"
                           placeholder="Частота полива"
                           ref={waterFrequencyInputRef}/>
                </div>
            </div>
            <div className="prompt"
                 ref={promptDivRef}
                 style={{ display: "none" }}>
                Подсказка
            </div>
            <button className="goto-blog-button">
                Добавить информацию
                <FontAwesomeIcon icon={faArrowRight} size="xs"/>
            </button>
            <button className="create-plant-button" onClick={sendPlantInfo}>
                Сохранить
            </button>
        </div>
    );
}

export default NewPlantForm;