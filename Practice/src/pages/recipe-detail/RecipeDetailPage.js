import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import RecipeArticle from "../../components/recipe-article/RecipeArticle";

const RecipeDetailPage = () => {
    const { recipeId } = useParams();
    const savedRecipes = useSelector(state => state.recipes.savedRecipes);
    const recipeInfo = savedRecipes.find(recipe => recipe.id == recipeId)

    return (
        <React.Fragment>
            <RecipeArticle currentRecipe={recipeInfo} />
        </React.Fragment>
    )
}

export default RecipeDetailPage;