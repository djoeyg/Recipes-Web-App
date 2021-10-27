import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Images from '../images/directory.js';

function Recipe({ recipe, onDelete, onEdit }) {
    let val = recipe._id;
    return (
        <tr>
            <td><img src={Images.val} alt={"image"}/></td>
            <td>{recipe.title}</td>
            <td><Link to="/view-recipe">View Recipe</Link></td>
            <td>{recipe.rating}</td>
            <td>{recipe.notes}</td>
            <td>{recipe.ideas}</td>
            <td><AiFillEdit onClick={() => onEdit(recipe)} /></td>
            <td><BiTrash onClick={() => onDelete(recipe._id)} /></td>
        </tr>
    );
}

export default Recipe;