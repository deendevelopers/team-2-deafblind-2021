import React from "react";
import RecipeSearch from "../../components/recipe-search/RecipeSearch";
import "./RecipeSearchPage.scss";
import { useSelector } from "react-redux";
import RecipeCard from "../../components/recipe-card/RecipeCard";

const RecipeSearchPage = () => {
    const searchResults = useSelector(state => state.recipes.searchResults);

    return (
        <section className="recipesearchpage-section">
            <RecipeSearch />
            { searchResults.length!==0 && (
                <section className="search-results-section">
                    <h2 className="section-heading">Search Results</h2>
                    <div className="recipe-search-articles-container">
                        {searchResults.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)} 
                    </div> 
                </section>
                ) 
            }
        </section>
    )
}

export default RecipeSearchPage;