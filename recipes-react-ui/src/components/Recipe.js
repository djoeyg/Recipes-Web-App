import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Recipe({ recipe, onDelete, onEdit }) {
    return (
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.reps}</td>
            <td><Link to="/view-recipe">View Recipe</Link></td>
            <td>{recipe.weight}</td>
            <td>{recipe.unit}</td>
            <td>{recipe.date}</td>
            <td><AiFillEdit onClick={() => onEdit(recipe)} /></td>
            <td><BiTrash onClick={() => onDelete(recipe._id)} /></td>
        </tr>
    );
}

export default Recipe;