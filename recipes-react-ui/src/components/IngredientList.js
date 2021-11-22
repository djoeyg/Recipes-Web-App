import React from 'react';

function IngredientList({ resultList }) {
    if (resultList !== '') {
    return (
        <table id="">
            <thead>
                <tr>
                    <th>Shopping List</th>
                </tr>
            </thead>
            <tbody>
                {resultList.map(ingredient => <tr><td>{ingredient}</td></tr>)}
            </tbody>
        </table>
    )} else {
        return null
    };
}

export default IngredientList;