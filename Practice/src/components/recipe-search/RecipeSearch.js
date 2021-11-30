import React from "react";
import "./RecipeSearch.scss";

const RecipeSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <label htmlFor="recipe-search">Recipe Search:
            <input id="recipe-search" type="text" name="recipe-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </label>
    )
}

export default RecipeSearch;