import React from 'react';
import { Link } from 'react-router-dom';
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
            <RecipeList recipes={recipes} onDelete={onDelete} onEdit={onEdit}></RecipeList>
            <Link to="/add-recipe">Add a Recipe</Link>
        </>
    );
}

export default HomePage;