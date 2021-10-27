import React from 'react';
import Recipe from './Recipe';

function RecipeList({ recipes, onDelete, onEdit }) {
    return (
        <table id="recipes">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Recipe Name</th>
                    <th>View Recipe</th>
                    <th>Rating</th>
                    <th>Notes</th>
                    <th>Ideas</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((recipe, i) => <Recipe recipe={recipe}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default RecipeList;
