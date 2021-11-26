import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function PrintRecipePage({ recipeToEdit }) {

    const recipeId = recipeToEdit._id
    const [viewDisplay, setDisplay] = useState('')

    const getPrintView = async () => {
        const response = await fetch('https://dreamteam-htmlconvert.herokuapp.com/api/', {
            method: 'GET',
            mode: 'cors',
            /*params: JSON.stringify({id: recipeId}),*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log(`${recipeId}`)
        if (response.status !== 200) {
            alert(`Failed to load recipe, status code = ${response.status}`);
        };
        const viewData = await response.json();
        const viewDisplay = viewData[recipeId-1].html;
        setDisplay(viewDisplay);
    };

    getPrintView();
    if (viewDisplay !== '') {
    return (
        <div>
            <br></br>
            <Link to="/">Return to Recipes List</Link><br></br>
            <div className="Html-display" dangerouslySetInnerHTML={{__html: viewDisplay}}/>
        </div>
    )} else {
        return (
            <div>
                <br></br>
                <Link to="/">Return to Recipes List</Link><br></br>
                <p>Loading...</p>
        </div>
        )
    };
};

export default PrintRecipePage;