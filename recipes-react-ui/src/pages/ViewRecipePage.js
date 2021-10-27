import '../Layout.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import ChickenDinner from '../images/chicken_marsala.jpg';
/*import Images from '../images/directory.js';*/

export const ViewRecipePage = ({ recipeToEdit }) => {

    /*const [title, setTitle] = useState(recipeToEdit.title);*/
    /*const [directions, setDirections] = useState(recipeToEdit.directions);*/
    /*const [rating, setRating] = useState(recipeToEdit.rating);*/
    const [notes, setNotes] = useState(recipeToEdit.notes);
    const [ideas, setIdeas] = useState(recipeToEdit.ideas);
    /*const [ingredients, setIngredients] = useState(recipeToEdit.ingredients);*/
    /*const [prepTime, setPrepTime] = useState(recipeToEdit.prepTime);*/
    /*const [cookTime, setCookTime] = useState(recipeToEdit.cookTime);*/
    /*const [totalTime, setTotalTime] = useState(recipeToEdit.totalTime);*/

    const history = useHistory();

    const editRecipe = async () => {
        const editedRecipe = { notes, ideas };
        const response = await fetch(`/recipes/${recipeToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedRecipe),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully updated the recipe");
        } else {
            alert(`Failed to update recipe, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
      <div class="wrapper">
        <div class="box box1">
            <Link to="/">Return to Recipes List</Link>
        </div>
        <div class="box box2"><img src={ChickenDinner} alt={""}/></div>
        <div class="box box3">
            <Link to="/">Print out this Recipe</Link>
        </div>
        <div class="box box4">
            <p>
                <h4>INGREDIENTS</h4>
            1-1/2 pounds boneless skinless chicken breasts, pounded ¼-inch thick (see note), or chicken tenderloins<br></br>
            3 tablespoons all-purpose flour<br></br>
            Salt<br></br>
            Freshly ground black pepper<br></br>
            1 tablespoon olive oil<br></br>
            3 tablespoons unsalted butter, divided<br></br>
            1 (8-oz) package pre-sliced bella or button mushrooms<br></br>
            3 tablespoons finely chopped shallots, from 1 medium shallot<br></br>
            2 cloves garlic, minced<br></br>
            2/3 cup chicken broth<br></br>
            2/3 cup dry Marsala wine<br></br>
            2/3 cup heavy cream<br></br>
            2 teaspoons chopped fresh thyme<br></br>
            2 tablespoons chopped fresh Italian parsley, for serving (optional)
            </p>
        </div>
        <div class="box box5">
            <p>
                <h2>Chicken Marsala</h2>
                Chicken Marsala is an Italian-American dish of golden pan-fried chicken cutlets and mushrooms in a rich Marsala wine sauce.
                <br></br>
                <br></br>Servings: 4
                <br></br>Prep Time: 15 Minutes
                <br></br>Cook Time: 30 Minutes
                <br></br>Total Time: 45 Minutes
            </p>
        </div>
        <div class="box box6">
            <h4>Notes about this Recipe:</h4>
            <textarea
                rows="12"
                cols="60"
                value={notes}
                onChange={e => setNotes(e.target.value)} />
            <br></br>
            <button
                onClick={editRecipe}>Save
            </button>    
        </div>
        <div class="box box7">
            <h4>Ideas for next time:</h4>
            <textarea
                rows="12"
                cols="60"
                value={ideas}
                onChange={e => setIdeas(e.target.value)} />
            <br></br>
            <button
                onClick={editRecipe}>Save
            </button>
        </div>
        <div class="box box8">
            <p>INSTRUCTIONS
                Place the flour, 3/4 teaspoon salt, and 1/4 teaspoon pepper in a ziplock bag. Add the chicken to the bag; seal bag tightly 
                and shake to coat chicken evenly. Set aside.
                Heat the oil and 2 tablespoons of the butter in a large skillet over medium-high heat. (Use a stainless steel pan for the 
                best browning. Nonstick will work too, but you won’t get that nice golden color on the chicken.) Place the flour-dusted 
                chicken in the pan, shaking off any excess first, and cook, turning once, until the chicken is golden and just barely cooked 
                through, about 5 to 6 minutes total. Transfer the chicken to a plate and set aside.
                Melt the remaining tablespoon of butter in the pan. Add the mushrooms and cook, stirring frequently, until the mushrooms 
                begin to brown, 3 to 4 minutes. Add the shallots, garlic, and 1/4 teaspoon of salt; cook for 1 to 2 minutes more. Add the 
                broth, Marsala, heavy cream, thyme, 1/4 teaspoon salt, and 1/8 teaspoon of pepper; use a wooden spoon to scrape any brown 
                bits from the pan into the liquid. Bring the liquid to a boil, then reduce the heat to medium and gently boil, uncovered, 
                until the sauce is reduced by about half, slightly thickened, and darkened in color, 10 to 15 minutes (you’re going for a 
                thin cream sauce; it won’t start to thicken until the very end of the cooking time). Add the chicken back to the pan, along 
                with any juices that accumulated on the plate. Reduce the heat to low and simmer until the chicken is warmed through and the 
                sauce thickens a bit more, 2 to 3 minutes. Sprinkle with parsley, if using, and serve.
                Note: If your chicken breasts are large (like the ones in the photos that are about 3/4 lb. each), it’s best to first cut 
                them horizontally to form four flat fillets, then pound them to an even 1/4-inch thickness. If you pound large chicken 
                breasts without first halving them, they’ll be huge. Of course, you could also pound them thin first and then cut them in half
                vertically; the only drawback is that they’ll lose their natural shape (which, admittedly, is not a big deal!).</p>
        </div>
      </div>
    );
}

export default ViewRecipePage;