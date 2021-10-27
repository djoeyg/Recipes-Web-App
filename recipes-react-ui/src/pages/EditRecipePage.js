import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditRecipePage = ({ recipeToEdit }) => {

    const [title, setTitle] = useState(recipeToEdit.title);
    const [directions, setDirections] = useState(recipeToEdit.directions);
    const [rating, setRating] = useState(recipeToEdit.rating);
    const [notes, setNotes] = useState(recipeToEdit.notes);
    const [ideas, setIdeas] = useState(recipeToEdit.ideas);
    const [ingredients, setIngredients] = useState(recipeToEdit.ingredients);
    const [prepTime, setPrepTime] = useState(recipeToEdit.prepTime);
    const [cookTime, setCookTime] = useState(recipeToEdit.cookTime);
    const [totalTime, setTotalTime] = useState(recipeToEdit.totalTime);

    const history = useHistory();

    const editRecipe = async () => {
        const editedRecipe = { title, directions, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime };
        const response = await fetch(`/recipes/${recipeToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedRecipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully updated the recipe");
        } else {
            alert(`Failed to update recipe, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
      <div> 
        <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)} />
        <input
            type="text"
            value={directions}
            onChange={e => setDirections(e.target.value)} />
        <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)} />

        <select name='rating' value={rating} onChange={e => setRating(e.target.value)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            </select>
        <input
            type="text"
            value={ideas}
            onChange={e => setIdeas(e.target.value)} />
        <input
            type="text"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)} />
        <input
            type="text"
            value={prepTime}
            onChange={e => setPrepTime(e.target.value)} />
        <input
            type="text"
            value={cookTime}
            onChange={e => setCookTime(e.target.value)} />
        <input
            type="text"
            value={totalTime}
            onChange={e => setTotalTime(e.target.value)} />
        <button
            onClick={editRecipe}>Save
        </button>
      </div>
    );
}

export default EditRecipePage;