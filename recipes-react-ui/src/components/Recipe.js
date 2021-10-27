import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Images from '../images/directory.js';
import '../App.css';

function Recipe({ recipe, onDelete, onEdit }) {
    return (
        <tr>
            <td><img class="App-thumbnail" src={Images.pic2} alt={""}/></td>
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