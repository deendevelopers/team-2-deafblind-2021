import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import RecipeArticle from "../../components/recipe-article/RecipeArticle";
import SaveRecipeButton from "../../components/save-recipe-button/SaveRecipeButton";
import { addRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import { addRecipe } from "../../redux/recipes/recipesActions";
import SignInAndSave from "../../components/sign-in-and-save/SignInAndSave";
import CustomButton from "../../components/custom-button/CustomButton";

const RecipeDetailPage = () => {
    const { recipeId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    // const savedRecipes = useSelector(state => state.recipes.savedRecipes);
    const currentUser = useSelector(state => state.user.currentUser);
    const currentRecipe = useSelector(state => state.recipes.currentRecipe);
    // const recipeInfo = savedRecipes.find(recipe => recipe.id == recipeId)

    const handleSaveRecipe = () => {
        console.log("Handle Save Recipe")
        // const { id } = currentRecipe;
        // Save/add recipe to redux recipe slice 
        dispatch(addRecipe(currentRecipe));
        // Save/add recipe ID to redux saved recipes array in current user slice
        console.log(recipeId);
        const recipeIdNumber = Number(recipeId)
        dispatch(addRecipeIdToUserSavedRecipesIds({ userId: currentUser.id, recipeId: recipeIdNumber }));

    }

    return (
        <React.Fragment>
            <RecipeArticle currentRecipe={currentRecipe} />
            { currentUser ? <SaveRecipeButton savedRecipesIds={currentUser.savedRecipesIds} currentRecipeId={currentRecipe.id} handleSaveRecipe={handleSaveRecipe} /> : <SignInAndSave />}
            <CustomButton onClick={() => history.push("/")}>Search For New Recipe</CustomButton>
        </React.Fragment>
    )
}

export default RecipeDetailPage;