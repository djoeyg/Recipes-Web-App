import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddRecipePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addRecipe = async () => {
        const newRecipe = { name, reps, weight, unit, date };
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
                type="text"
                value={name}
                placeholder="Enter name here"
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="Enter lbs or kgs here"
                value={unit}
                onChange={e => setUnit(e.target.value)} />    
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addRecipe}
            >Add</button>
        </div>
    );
}

export default AddRecipePage;