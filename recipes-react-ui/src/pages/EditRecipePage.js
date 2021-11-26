import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const EditRecipePage = ({ recipeToEdit }) => {

    const [_id, setId] = useState(recipeToEdit._id);
    const [title, setTitle] = useState(recipeToEdit.title);
    const [imgUrl, setImgUrl] = useState(recipeToEdit.imgUrl);
    const [directions, setDirections] = useState(recipeToEdit.directions);
    const [description, setDescription] = useState(recipeToEdit.description);
    const [rating, setRating] = useState(recipeToEdit.rating);
    const [notes, setNotes] = useState(recipeToEdit.notes);
    const [ideas, setIdeas] = useState(recipeToEdit.ideas);
    const [ingredients, setIngredients] = useState(recipeToEdit.ingredients);
    const [prepTime, setPrepTime] = useState(recipeToEdit.prepTime);
    const [cookTime, setCookTime] = useState(recipeToEdit.cookTime);
    const [totalTime, setTotalTime] = useState(recipeToEdit.totalTime);

    const history = useHistory();

    const editRecipe = async () => {
        const editedRecipe = { _id, title, imgUrl, directions, description, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime };
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
        <h1>Edit Recipe Page</h1>
        <p>Make entries for each field below.
        <br></br>
        Id# :
        <input
            type="number"
            value={_id}
            onChange={e => setId(e.target.value)} />
        <br></br>
        Title :
        <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)} />
        <br></br>
        Image Source URL :
        <input
            type="text"
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)} />
        <br></br>
        Directions :
        <input
            type="text"
            value={directions}
            onChange={e => setDirections(e.target.value)} />
        <br></br>
        Description :
        <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)} />
        <br></br>
        Rating :
        <select name='rating' value={rating} onChange={e => setRating(e.target.value)}>
            <option value=''></option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
        </select>
        <br></br>
        Notes :
        <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)} />
        <br></br>
        Ideas :
        <input
            type="text"
            value={ideas}
            onChange={e => setIdeas(e.target.value)} />
        <br></br>
        Ingredients :
        <input
            type="text"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)} />
        <br></br>
        Prep Time : 
        <input
            type="text"
            value={prepTime}
            onChange={e => setPrepTime(e.target.value)} />
        <br></br>
        Cook Time :
        <input
            type="text"
            value={cookTime}
            onChange={e => setCookTime(e.target.value)} />
        <br></br>
        Total Time :
        <input
            type="text"
            value={totalTime}
            onChange={e => setTotalTime(e.target.value)} />
        <br></br>
        </p>
        <button
            onClick={editRecipe}>Save Changes to Recipe
        </button>
        <br></br>
        <Link to="/">Cancel and Return to Recipes List</Link>
      </div>
    );
}

export default EditRecipePage;