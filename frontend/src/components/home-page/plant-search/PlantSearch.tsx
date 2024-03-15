import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import "./PlantSearch.scss"

function PlantSearch() {
    const searchPlaceholder = "Найти растение"

    return (
        <div className="plant-search-wrap">
            <div className="plant-search-image"><FontAwesomeIcon icon={ faMagnifyingGlass } size="lg" /></div>
            <input type="text"
                   className="plant-search"
                   placeholder={ searchPlaceholder } >
            </input>
        </div>
    );
}

export default PlantSearch;