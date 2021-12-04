import React from 'react';
import { Link } from 'react-router-dom';
import RandomRecipe from '../components/RandomRecipe';
import RecipeList from '../components/RecipeList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setRecipeToEdit, setRecipeToAdd }) {

    const [url, setUrl] = useState('');
    const [recipes, setRecipes] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/recipes/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setRecipes(recipes.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete recipe with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const getScrapeData = async () => {
        
        // --Documentation & Test data for scraper API--  
        //send a POST request with a JSON that has a single key-value pair {'URL': 'allrecipes.com/whateverrecipeyouwant'}
        //url = "https://www.allrecipes.com/recipe/21261/yummy-sweet-potato-casserole/";
        //curl -H "Content-Type: application/json" -X POST https://cs361recipescraper.herokuapp.com/scrape -d "{\"URL\": \"https://www.allrecipes.com/recipe/173941/steak-house-au-gratin-potatoes/\"}"
        
        const response = await fetch('https://cs361recipescraper.herokuapp.com/scrape', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({URL: url}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert(`Successfully retrieved recipe from www.allrecipes.com, status code = ${response.status}`);
        } else {
            alert(`Error: status code = ${response.status}`);
        };
        const data = await response.json();
        onScrape(data)
    };

    const onEdit = recipe => {
        setRecipeToEdit(recipe);
        history.push("/edit-recipe");
    }

    const onView = recipe => {
        setRecipeToEdit(recipe);
        history.push("/view-recipe");
    }

    const onScrape = data => {
        setRecipeToAdd(data);
        history.push("/scrape-recipe");
    }

    const loadRecipes = async () => {
        const response = await fetch('/recipes');
        const data = await response.json();
        setRecipes(data);
    }

    useEffect(() => {
        loadRecipes();
    }, []);

    return (
        <>
            <h2>My Recipe Book</h2>
            <RandomRecipe recipes={recipes} onView={onView}></RandomRecipe>
            <RecipeList recipes={recipes} onDelete={onDelete} onEdit={onEdit} onView={onView}></RecipeList>
            <p>Enter a web address for a recipe from All-Recipes.com.</p>
            <br></br>
            <input
                type="text"
                value={url}
                placeholder="www.all-recipes/recipe/12345/.com"
                onChange={e => setUrl(e.target.value)} />
            <br></br>      
            <button
                onClick={ getScrapeData }>Submit
            </button>
            <Link to="/add-recipe">Add a Recipe</Link>
            <p>You will need the following information to add a recipe:<br></br>Id#, Title, Recipe Directions, Prep Time &amp; Cook Time</p>
        </>
    );
}

export default HomePage;