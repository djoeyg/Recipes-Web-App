import * as recipes from './recipes_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

/**
 * Creates a new recipe with the name, reps, weight, unit and date provided in the body
 */
app.post('/recipes', (req, res) => {
    recipes.createRecipe(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 500.
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrives the recipe corresponding to the ID provided in the URL.
 */
app.get('/recipes/:_id', (req, res) => {
    const recipeId = req.params._id;
    recipes.findRecipeById(recipeId)
        .then(recipe => {
            if (recipe !== null) {
                res.json(recipe);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrives and returns all recipes. 
 */
app.get('/recipes', (req, res) => {
    recipes.findRecipes()
        .then(recipes => {
            res.json(recipes);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Updates the recipe whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put('/recipes/:_id', (req, res) => {
    recipes.replaceRecipe(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Deletes the recipe whose id is provided in the query parameters
 */
app.delete('/recipes/:_id', (req, res) => {
    recipes.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});