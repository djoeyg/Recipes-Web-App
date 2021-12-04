import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import '../Layout.css';

export const ScrapeRecipePage = ({ data }) => {

    const dataRequest = data.recipe;
    const name = data.recipe.name;
    const image = data.recipe.image_url;
    const instructions = data.recipe.recipeInstructions;    
    const list = data.recipe.recipeIngredients;

    function extractRecipe(arrayIn){
        let result = '';
        for (let i = 0; i < arrayIn.length; i++){
            result = result + arrayIn[i].instruction;
        }
        return result;
    }
    function extractIngredients(arrayIn){
        let result = '';
        for (let i = 0; i < arrayIn.length; i++){
            const newline = arrayIn[i] + " ";
            result = result + newline;
        }
        return result;
    }
    const paragraph = extractRecipe(instructions);
    const ingredientList = extractIngredients(list);

    const title = name;
    const imgUrl = image;
    const directions = paragraph;
    const ingredients = ingredientList;

    const [_id, setId] = useState('');
    const [resultList, setIngredients] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [notes, setNotes] = useState('');
    const [ideas, setIdeas] = useState('');
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

    const ShoppingList = async () => {
        
        // --Test data for Shopping List API request--
        //curl -H "Content-Type: application/json" -X POST https://recipeingredientlist.herokuapp.com/ -d "{\"recipe\":{\"name\":\"Steak House 
        //Au Gratin Potatoes\",\"recipeIngredients\":[\"1 tablespoon butter\",\"3 russet potato, peeled and cubed\",\"1 cup heavy cream\",\"0.5 
        //cup 2% reduced-fat milk\",\"4 cloves garlic, minced\",\"2 tablespoons all-purpose flour\",\"salt and black pepper to taste\",\"1 cup 
        //grated medium Cheddar cheese\"],\"recipe_url\":\"https://www.allrecipes.com/recipe/173941/steak-house-au-gratin-potatoes/\"}}"

        const response = await fetch('http://127.0.0.1:8080/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(dataRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert(`Successfully connected to API: status code = ${response.status}`);
        } else {
            alert(`Failed to connect with API: status code = ${response.status}`);
        }
        const resultData = await response.json();
        const resultList = resultData.recipeIngredients;
        setIngredients(resultList);
    };

    return (
        <div className="wrapper">
            <div className="box box1">
                <br></br>
                    <Link to="/">Return to Recipes List</Link>
                <br></br>
                <input
                    type="number"
                    placeholder="Enter rating 1-3"
                    value={rating}
                    onChange={e => setRating(e.target.value)} />
                <br></br> 
            </div>
            <div className="box box2">
                <script></script>
                <img src={image} alt={""}/></div>
            <div className="box box3">
                <br></br>
                
            </div>

            <div className="box box4">
                <br></br>
                <button
                    onClick={ShoppingList}>Generate Shopping List
                </button>
                <br></br><br></br>
                <IngredientList resultList={resultList} ></IngredientList>
            </div>

            <div className="box box5">
                <p>
                    <h1>Add this Recipe?</h1>
                    <h2>{name}</h2>
                    Check and make entries for each field below then click the submit button below.<br></br>
                    Enter a Recipe Id :<br></br>
                    <input
                        type="number"
                        value={_id}
                        placeholder="Recipe ID"
                        onChange={e => setId(e.target.value)} />
                    <br></br>
                    
                    Enter Recipe Description :<br></br>
                    <input
                        type="text"
                        value={description}
                        placeholder="Enter description"
                        onChange={e => setDescription(e.target.value)} />
                    <br></br>
                        {description}
                    <br></br>
                    <p>
                        Prep Time: {prepTime} 
                        <br></br>
                        <input
                            type="text"
                            value={prepTime}
                            placeholder="Prep time"
                            onChange={e => setPrepTime(e.target.value)} />
                        <br></br><br></br>
                        Cook Time: {cookTime}
                        <br></br>
                        <input
                            type="text"
                            value={cookTime}
                            placeholder="Cook Time"
                            onChange={e => setCookTime(e.target.value)} />
                        <br></br><br></br>
                        Total Time: {totalTime}
                        <br></br>
                        <input
                            type="text"
                            value={totalTime}
                            placeholder="Total time"
                            onChange={e => setTotalTime(e.target.value)} />
                        <br></br><br></br>    
                    </p>
                    <button
                        onClick={addRecipe}>Add to Recipes List
                    </button>
                    <br></br>
                        <Link to="/">Cancel and Return to Recipes List</Link>
                </p>
            </div>
            <div className="box box6">
                <h4>Notes about this Recipe:</h4>
                <p>How was the recipe? Write down your thoughts.</p>
                <textarea
                    rows="12"
                    cols="60"
                    value={notes}
                    placeholder="Enter notes"
                    onChange={e => setNotes(e.target.value)} />
            </div>
            <div className="box box7">
                <h4>Ideas for next time:</h4>
                <p>Have an idea to try something different? Write it down here.</p>
                <textarea
                    rows="12"
                    cols="60"
                    value={ideas}
                    placeholder="Enter ideas"
                    onChange={e => setIdeas(e.target.value)} />
            </div>
            <div className="box box8">
                <h4>Directions for this Recipe:</h4>
                    {paragraph}
            </div>            
        </div>
    );
}

export default ScrapeRecipePage;