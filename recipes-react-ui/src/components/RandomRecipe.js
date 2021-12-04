import React from 'react';

function RandomRecipe({ recipes, onView }) {

    const getRandom = async () => {
        
        const collectionSize = Object.keys(recipes).length + 1;
    
        const response = await fetch('https://cs360-random-recipe-generator.herokuapp.com/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({random_array: {array_length: collectionSize}}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            // --Optional alert for successful API call--
            /* alert(`Successfully called random generator API, status code = ${response.status}`);
        } else { */
            alert(`Failed to connect with API, status code = ${response.status}`);
        }
        const data = await response.json();
        const resultData = data.random_array.return_index + 1;
        let recipe;
        const getRandomRecipe = async () => {
            const response = await fetch(`/recipes/${resultData}`);
            recipe = await response.json();
            onView(recipe)
        }
        getRandomRecipe()
    };
    
    return (
        <div>
            <button
                onClick={ getRandom }>Fetch a Random Recipe
            </button>
        </div>
    );
}

export default RandomRecipe;