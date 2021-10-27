// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database recipes_db in the MongoDB server running locally on port 27017
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
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Recipe = mongoose.model("Recipe", recipeSchema);

/**
 * Create a recipe
 * @param {String} name 
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createRecipe = async (name, reps, weight, unit, date) => {
    const recipe = new Recipe({ name: name, reps: reps, weight: weight, unit: unit, date: date });
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
 * Replace the name, reps, weight, unit, and date properties of the recipe with the id value provided
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date 
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceRecipe = async (_id, name, reps, weight, unit, date) => {
    const result = await Recipe.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
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