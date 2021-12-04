import { addCustomRecipeToFirebaseCustomRecipes, addRecipeToFirebase, getSavedRecipesFromFirebase } from "../../firebase/firebaseUtils";
import { ADD_CUSTOM_RECIPE_TO_FIREBASE, ADD_RECIPE, GET_SAVED_RECIPES_FROM_FIREBASE, SET_CURRENT_RECIPE } from "./recipesTypes";

export const setCurrentRecipe = (recipe) => dispatch => {
    
    dispatch({
        type: SET_CURRENT_RECIPE,
        payload: recipe
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