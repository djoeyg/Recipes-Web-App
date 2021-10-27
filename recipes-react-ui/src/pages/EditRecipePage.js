import '../Layout.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import ChickenDinner from '../images/chicken_marsala.jpg';

export const EditRecipePage = ({ recipeToEdit }) => {

    const [name, setName] = useState(recipeToEdit.name);
    const [reps, setReps] = useState(recipeToEdit.reps);
    const [weight, setWeight] = useState(recipeToEdit.weight);
    const [unit, setUnit] = useState(recipeToEdit.unit);
    const [date, setDate] = useState(recipeToEdit.date);

    const history = useHistory();

    const editRecipe = async () => {
        const editedRecipe = { name, reps, weight, unit, date };
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
      <div class="wrapper">
        <div class="box box1">
            <Link to="/">Return to Recipes List</Link>
        </div>
        <div class="box box2"><img src={ChickenDinner} alt={""}/></div>
        <div class="box box3">
            <Link to="/">Print out this Recipe</Link>
        </div>
        <div class="box box4">Box 4</div>
        <div class="box box5">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />

            <select name='unit' value={unit} onChange={e => setUnit(e.target.value)}>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
                </select>
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editRecipe}>Save
            </button>
        </div>
        <div class="box box6">Box 6</div>
        <div class="box box7">Box 7</div>
      </div>
    );
}

export default EditRecipePage;