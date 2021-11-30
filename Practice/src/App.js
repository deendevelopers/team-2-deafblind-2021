import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import './App.scss';
// import RecipeSearchPage from "./pages/recipe-search/RecipeSearchPage";
import RandomRecipePage from "./pages/random-recipe/RandomRecipePage";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Route exact path="/" component={HomePage}/>
        {/* <Route exact path="/recipe-search" component={RecipeSearchPage} /> */}
        <Route path="/random-recipe" component={RandomRecipePage} />
      </Router>
    </ React.Fragment>
  );
}

export default App;
