import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><AiFillEdit onClick={() => onEdit(exercise)} /></td>
            <td><BiTrash onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;