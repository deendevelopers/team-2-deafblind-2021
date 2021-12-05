import { addCustomRecipeToFirebaseCustomRecipes, addRecipeToFirebase, getSavedRecipesFromFirebase } from "../../firebase/firebaseUtils";
import { ADD_CUSTOM_RECIPE_TO_FIREBASE, ADD_RECIPE, GET_SAVED_RECIPES_FROM_FIREBASE, SEARCH_FOR_RECIPES, SET_CURRENT_RECIPE, SET_CURRENT_RECIPE_WITH_ID } from "./recipesTypes";
import { fetchRecipeSearchResultsFromSpoonacular, getFullRecipeInfoFromSpoonacular } from "./recipesUtils";

export const setCurrentRecipe = (recipe) => dispatch => {
    dispatch({
        type: SET_CURRENT_RECIPE,
        payload: recipe
    })
}

export const setCurrentRecipeWithId = (recipeId) => dispatch => {
    dispatch({
        type: SET_CURRENT_RECIPE_WITH_ID,
        payload: recipeId
    })
}

export const addRecipe = (recipe) => async (dispatch) => {
    
    //Add to firebase
    await addRecipeToFirebase(recipe);
    // Add to redux
    dispatch({
        type: ADD_RECIPE,
        payload: recipe
    })
}

export const getSavedRecipes = (savedRecipesIds) => async (dispatch) => {
    console.log({savedRecipesIds});
    const savedRecipes = await getSavedRecipesFromFirebase(savedRecipesIds);

    dispatch({
        type: GET_SAVED_RECIPES_FROM_FIREBASE,
        payload: savedRecipes
    })
}

export const addCustomRecipeToFirebase = (newRecipe) => async (dispatch) => {
    await addCustomRecipeToFirebaseCustomRecipes(newRecipe);
    dispatch({
        type: ADD_CUSTOM_RECIPE_TO_FIREBASE
    })
}

export const searchForRecipes = (searchQuery) => async (dispatch) => {

    const results = await fetchRecipeSearchResultsFromSpoonacular(searchQuery);
    
    //Get full recipe info
    const fullRecipesData = await getFullRecipeInfoFromSpoonacular(results);

    // Add recipes to firebase
    // fullRecipes.forEach(recipe => dispatch(addRecipe(recipe)))

    dispatch({
        type: SEARCH_FOR_RECIPES,
        payload: {
            searchResults: results,
            savedRecipes: fullRecipesData
        }
    })
}