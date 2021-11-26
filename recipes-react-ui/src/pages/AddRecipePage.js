import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const AddRecipePage = () => {

    const [_id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState('')
    const [directions, setDirections] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [ideas, setIdeas] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const history = useHistory();

    const addRecipe = async () => {
        const newRecipe = { _id, title, imgUrl, directions, description, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime };
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
            <p>Make entries for each field below.</p>
            <input
                type="number"
                value={_id}
                placeholder="Recipe ID"
                onChange={e => setId(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={title}
                placeholder="Enter title"
                onChange={e => setTitle(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={imgUrl}
                placeholder="Enter img src"
                onChange={e => setImgUrl(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={directions}
                placeholder="Enter recipe"
                onChange={e => setDirections(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={description}
                placeholder="Enter description"
                onChange={e => setDescription(e.target.value)} />
            <br></br>
            <input
                type="number"
                placeholder="Enter rating 1-3"
                value={rating}
                onChange={e => setRating(e.target.value)} />
            <br></br>    
            <input
                type="text"
                placeholder="Enter notes"
                value={notes}
                onChange={e => setNotes(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={ideas}
                placeholder="Enter ideas"
                onChange={e => setIdeas(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={ingredients}
                placeholder="Enter ingredients"
                onChange={e => setIngredients(e.target.value)} />
            <br></br>
            <input
                type="text"
                value={prepTime}
                placeholder="Prep time"
                onChange={e => setPrepTime(e.target.value)} />
            <br></br>
            <input
                type="text"
                placeholder="Cook Time"
                value={cookTime}
                onChange={e => setCookTime(e.target.value)} />
            <br></br>    
            <input
                type="text"
                placeholder="Total time"
                value={totalTime}
                onChange={e => setTotalTime(e.target.value)} />
            <br></br>
            <button
                onClick={addRecipe}
            >Add to Recipes List</button>
            <br></br>
            <Link to="/">Cancel and Return to Recipes List</Link>
        </div>
    );
}

export default AddRecipePage;