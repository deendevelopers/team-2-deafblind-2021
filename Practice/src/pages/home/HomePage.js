import React from "react";
import Header from "../../components/header/Header";

import "./HomePage.scss";
import RandomRecipePage from "../random-recipe/RandomRecipePage";
import RecipeSearchPage from "../recipe-search/RecipeSearchPage";

const HomePage = ({ history }) => (
    <React.Fragment>
        <Header title="Welcome to the Recipe Mate" message="We hope you have an amazing cooking experience together!" />
        <RecipeSearchPage />
        <section className="homepage-section">
            <h2>Click here to go to be a bit adventurous and search for a random recipe!</h2>
            <RandomRecipePage />
        </section>
    </ React.Fragment>
)


export default HomePage;
