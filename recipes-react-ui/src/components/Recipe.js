import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Images from '../images/directory.js';
import '../App.css';

function Recipe({ recipe, onDelete, onEdit }) {

    function getColor(rating) {
        let bgc;
        if (rating === 1) {
            bgc = "BGC-1";
        } else if (rating === 2) {
            bgc = "BGC-2";
        } else if (rating === 3) {
            bgc = "BGC-3";
        }
        return bgc
    }

    return (
        <tr class={getColor(recipe.rating)}>
            <td><img class="App-thumbnail" src={Images[recipe._id]} alt={""}/></td>
            <td>{recipe.title}</td>
            <td><Link onClick={() => onEdit(recipe)} to="/view-recipe">View Recipe</Link></td>
            <td>{recipe.rating}</td>
            <td>{recipe.notes}</td>
            <td>{recipe.ideas}</td>
            <td><AiFillEdit onClick={() => onEdit(recipe)} /></td>
            <td><BiTrash onClick={() => onDelete(recipe._id)} /></td>
        </tr>
    );
}

export default Recipe;