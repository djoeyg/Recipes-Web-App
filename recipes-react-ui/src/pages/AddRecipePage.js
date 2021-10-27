import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddRecipePage = () => {

    const [_id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [directions, setDirections] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [ideas, setIdeas] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const history = useHistory();

    const addRecipe = async () => {
        const newRecipe = { _id, title, directions, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime };
        const response = await fetch('/recipes', {
            method: 'POST',
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the new recipe");
        } else {
            alert(`Failed to add recipe, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add a Recipe</h1>
            <input
                type="number"
                value={_id}
                placeholder="Recipe ID"
                onChange={e => setId(e.target.value)} />
            <input
                type="text"
                value={title}
                placeholder="Enter title"
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                value={directions}
                placeholder="Enter recipe"
                onChange={e => setDirections(e.target.value)} />
            <input
                type="number"
                placeholder="Enter rating 1-3"
                value={rating}
                onChange={e => setRating(e.target.value)} />    
            <input
                type="text"
                placeholder="Enter notes"
                value={notes}
                onChange={e => setNotes(e.target.value)} />
            <input
                type="text"
                value={ideas}
                placeholder="Enter ideas"
                onChange={e => setIdeas(e.target.value)} />
            <input
                type="text"
                value={ingredients}
                placeholder="Enter ingredients"
                onChange={e => setIngredients(e.target.value)} />
            <input
                type="text"
                value={prepTime}
                placeholder="Prep time"
                onChange={e => setPrepTime(e.target.value)} />
            <input
                type="text"
                placeholder="Cook Time"
                value={cookTime}
                onChange={e => setCookTime(e.target.value)} />    
            <input
                type="text"
                placeholder="Total time"
                value={totalTime}
                onChange={e => setTotalTime(e.target.value)} />
            <button
                onClick={addRecipe}
            >Add</button>
        </div>
    );
}

export default AddRecipePage;