import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import RecipeArticle from "../../components/recipe-article/RecipeArticle";
import SaveRecipeButton from "../../components/save-recipe-button/SaveRecipeButton";
import { addRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import { addRecipe } from "../../redux/recipes/recipesActions";
import SignInAndSave from "../../components/sign-in-and-save/SignInAndSave";
import ChakraCustomButton from "../../components/chakra-custom-button/ChakraCustomButton";

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
            <ChakraCustomButton bg="#285E61" color="#fff" onClick={() => history.push("/")}>Search New Recipe</ChakraCustomButton>
        </React.Fragment>
    )
}

export default RecipeDetailPage;