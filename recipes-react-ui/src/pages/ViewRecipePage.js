import '../Layout.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
/*import IngredientList from '../components/IngredientList';*/
/*import Images from '../images/directory.js';*/

export const ViewRecipePage = ({ recipeToEdit }) => {

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
        const editedRecipe = { title, imgUrl, directions, description, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime };
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
        /*history.push("/");*/
    };

    return (
      <div className="wrapper">
        <div className="box box1">
            <br></br>
            <Link to="/">Return to Recipes List</Link>
            <br></br>
            <h5>Rate this Recipe</h5>
            <select name='rating' value={rating} onChange={e => setRating(e.target.value)}>
                <option value=''></option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
            <br></br>
            <button
                onClick={editRecipe}>Save Changes
            </button>
        </div>
        <div className="box box2">
            <img src={imgUrl} alt={""}/>
            <br></br>
            Image Source URL :
            <br></br>
            <input
                type="text"
                value={imgUrl}
                onChange={e => setImgUrl(e.target.value)} />
        </div>
        <div className="box box3">
            <br></br>
            <Link onClick={() => history.push("/print-recipe")} to="/print-recipe">View Recipe in Printer Format</Link>
        </div>
        <div className="box box4">
            <p>
                <h4>Ingredients</h4>
                {ingredients}<br></br><br></br>
            Edit Ingredients :<br></br>
            <textarea
                rows="7"
                cols="60"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)} />
            <br></br>
            <button
                onClick={editRecipe}>Save Changes to Ingredients
            </button>
            </p>
        </div>
        <div className="box box5">
            <p>
                <h2>{title}</h2>
                
                {description}
                
                <br></br>
                <p>
                    Prep Time: {prepTime} 
                    <br></br>
                    <input
                        type="text"
                        value={prepTime}
                        onChange={e => setPrepTime(e.target.value)} />
                    <br></br><br></br>
                    Cook Time: {cookTime}
                    <br></br>
                    <input
                        type="text"
                        value={cookTime}
                        onChange={e => setCookTime(e.target.value)} />
                    <br></br><br></br>
                    Total Time: {totalTime}
                    <br></br>
                    <input
                        type="text"
                        value={totalTime}
                        onChange={e => setTotalTime(e.target.value)} />
                    <br></br><br></br>
                    Edit Recipe Name :<br></br>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <br></br>
                    Edit Description :<br></br>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <br></br>
                </p>
                <button
                    onClick={editRecipe}>Save Changes to Recipe
                </button>
            </p>
        </div>
        <div className="box box6">
            <h4>Notes about this Recipe:</h4>
            <p>How was the recipe? Write down your thoughts.</p>
            <textarea
                rows="12"
                cols="60"
                value={notes}
                onChange={e => setNotes(e.target.value)} />
            <br></br>
            <button
                onClick={editRecipe}>Save
            </button>    
        </div>
        <div className="box box7">
            <h4>Ideas for next time:</h4>
            <p>Have an idea to try something different? Write it down here.</p>
            <textarea
                rows="12"
                cols="60"
                value={ideas}
                onChange={e => setIdeas(e.target.value)} />
            <br></br>
            <button
                onClick={editRecipe}>Save
            </button>
        </div>
        <div className="box box8">
            
            <h4>Directions for this Recipe:</h4>
                {directions}
            <p>
                Edit Directions :<br></br>
                <textarea
                    rows="7"
                    cols="200"
                    value={directions}
                    onChange={e => setDirections(e.target.value)} />
                <br></br>
                <button
                    onClick={editRecipe}>Save Changes to Directions
                </button>
            </p>
        </div>
      </div>
    );
}

export default ViewRecipePage;