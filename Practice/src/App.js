import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import './App.scss';
// import RecipeSearchPage from "./pages/recipe-search/RecipeSearchPage";
import RandomRecipePage from "./pages/random-recipe/RandomRecipePage";
import NavBar from "./components/navbar/NavBar";
import userDashboardPage from "./pages/user-dashboard/userDashboardPage";
import SignInPage from "./pages/sign-in/SignInPage";

const App = () => {
  const currentUser = "omid";
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Route exact path="/" component={HomePage}/>
        {/* <Route exact path="/recipe-search" component={RecipeSearchPage} /> */}
        <Route path="/random-recipe" component={RandomRecipePage} />
        <Route path="/dashboard" component={userDashboardPage} />
        <Route path="/sign-in" render={ () => currentUser ? <Redirect to="/" /> : <SignInPage />} />
      </Router>
    </ React.Fragment>
  );
}

export default App;
