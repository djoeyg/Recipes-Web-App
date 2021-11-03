// Get the mongoose object
import mongoose from 'mongoose';

// Connect to the database recipes_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/recipes_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set("useCreateIndex", true);

/**
 * Define the schema
 */
const recipeSchema = mongoose.Schema({
    _id: { type: Number, required: true},
    title: { type: String, required: true },
    directions: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    notes: { type: String, required: false },
    ideas: { type: String, required: false },
    ingredients: { type: String, required: false },
    prepTime: { type: String, required: false },
    cookTime: { type: String, required: false },
    totalTime: { type: String, required: false }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Recipe = mongoose.model("Recipe", recipeSchema);

/**
 * Create a recipe
 * @param {Number} _id
 * @param {String} title
 * @param {String} directions
 * @param {String} description
 * @param {Number} rating
 * @param {String} notes
 * @param {String} ideas 
 * @param {String} ingredients
 * @param {String} prepTime
 * @param {String} cookTime
 * @param {String} totalTime
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createRecipe = async (_id, title, directions, description, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime) => {
    const recipe = new Recipe({ _id: _id, title: title, directions: directions, description: description, rating: rating, notes: notes, ideas: ideas, ingredients: ingredients, prepTime: prepTime, cookTime: cookTime, totalTime: totalTime });
    return recipe.save();
}

/**
 * Retrive all recipes saved in the app
*/
const findRecipes = async () => {
    const query = Recipe.find()
    return query.exec();
}

/**
 * Find the recipe with the given ID value
 * @param {String} _id 
 * @returns 
 */
const findRecipeById = async (_id) => {
    const query = Recipe.findById(_id);
    return query.exec();
}

/**
 * Replace the title, directions, description, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime properties of the recipe with the id value provided
 * @param {Number} _id
 * @param {String} title
 * @param {String} directions
 * @param {String} description
 * @param {Number} rating
 * @param {String} notes
 * @param {String} ideas 
 * @param {String} ingredients
 * @param {String} prepTime
 * @param {String} cookTime
 * @param {String} totalTime
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceRecipe = async (_id, title, directions, description, rating, notes, ideas, ingredients, prepTime, cookTime, totalTime) => {
    const result = await Recipe.replaceOne({ _id: _id }, { title: title, directions: directions, description: description, rating: rating, notes: notes, ideas: ideas, ingredients: ingredients, prepTime: prepTime, cookTime: cookTime, totalTime: totalTime });
    return result.nModified;
}


/**
 * Delete the recipe with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Recipe.deleteOne({ _id: _id });
    // Return the count of deleted documents. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { deleteById, replaceRecipe, findRecipeById, createRecipe, findRecipes };