import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";
import "./RecipeSearch.scss";
import { useDispatch } from "react-redux";
import { searchForRecipes } from "../../redux/recipes/recipesActions";

const RecipeSearch = () => {

    const [ searchTerm, setSearchTerm ] = useState("");

    const dispatch = useDispatch();

    const handleSearch = () => {
        console.log(searchTerm);
        dispatch(searchForRecipes(searchTerm))
    }

    return (
        <React.Fragment>
            <input id="recipe-search-input" type="text" name="recipe-search" placeholder="Click here to search for a recipe of your liking" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <CustomButton onClick={handleSearch}>Search Recipe</ CustomButton>
        </React.Fragment>
    )
}

export default RecipeSearch;