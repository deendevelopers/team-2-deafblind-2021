import React from "react";
import RecipeSearch from "../../components/recipe-search/RecipeSearch";
import "./RecipeSearchPage.scss";
import { useSelector } from "react-redux";
import RecipeCard from "../../components/recipe-card/RecipeCard";


const RecipeSearchPage = () => {
    const searchResults = useSelector(state => state.recipes.searchResults);

    return (
        <section className="recipesearchpage-section">
            {/* <h2>Click here to search for a recipe of your liking</h2> */}
            <RecipeSearch />
            <section className="search-results-section">
                <h2 className="section-heading">Search Results</h2>
                <div className="recipe-search-articles-container">
                    { searchResults && searchResults.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />) }
                </div>
            </section>
        </section>
    )
}

export default RecipeSearchPage;