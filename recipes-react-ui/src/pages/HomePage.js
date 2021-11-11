import React from 'react';
import { Link } from 'react-router-dom';
import RandomRecipe from '../components/RandomRecipe';
import RecipeList from '../components/RecipeList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setRecipeToEdit }) {

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

    const onEdit = recipe => {
        setRecipeToEdit(recipe);
        history.push("/edit-recipe");
    }

    const onView = recipe => {
        setRecipeToEdit(recipe);
        history.push("/view-recipe");
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
            <br></br>
            <RecipeList recipes={recipes} onDelete={onDelete} onEdit={onEdit} onView={onView}></RecipeList>
            <Link to="/add-recipe">Add a Recipe</Link>
            <p>You will need the following information to add a recipe:<br></br>Id#, Title, Recipe Directions, Prep Time &amp; Cook Time</p>
        </>
    );
}

export default HomePage;