'use strict';

// NOTE: Don't change the port number
const PORT = 8080;

const { json } = require("express");
const express = require("express");
const app = express();


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json())

app.use(function (req, res, next) {
    req.headers['content-type'] = 'application/json';
    res.header['content-type'] = 'application/json';
    next();
});

app.post("/", (req, res) => {
    let request = req.body;
    let recipe = {"name" : "", recipeIngredients: ""};
    recipe.name = request.name;
    recipe.recipeIngredients = request.recipeIngredients
    res.send(JSON.stringify(recipe));  
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});