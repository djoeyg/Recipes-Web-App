import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import ViewRecipePage from './pages/ViewRecipePage';
import ScrapeRecipePage from './pages/ScrapeRecipePage';
import PrintRecipePage from './pages/PrintRecipePage.js';
import { useState } from 'react';

function App() {
  const [recipeToEdit, setRecipeToEdit] = useState();
  const [data, setRecipeToAdd] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setRecipeToEdit={setRecipeToEdit} setRecipeToAdd={setRecipeToAdd}/>
          </Route>
          <Route path="/add-recipe">
            <AddRecipePage />
          </Route>
          <Route path="/scrape-recipe">
            <ScrapeRecipePage data={data} />
          </Route>
          <Route path="/print-recipe">
            <PrintRecipePage recipeToEdit={recipeToEdit} />
          </Route>
          <Route path="/edit-recipe">
            <EditRecipePage recipeToEdit={recipeToEdit} />
          </Route>
          <Route path="/view-recipe">
            <ViewRecipePage recipeToEdit={recipeToEdit} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
