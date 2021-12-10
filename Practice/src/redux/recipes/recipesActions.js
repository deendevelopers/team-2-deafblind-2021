import { ADD_CUSTOM_RECIPE_TO_FIREBASE, ADD_RECIPE, GET_SAVED_RECIPES_FROM_FIREBASE, SEARCH_FOR_RECIPES, SET_CURRENT_RECIPE, SET_CURRENT_RECIPE_WITH_ID } from "./recipesTypes";
import { fetchRecipeSearchResultsFromSpoonacular, getFullRecipeInfoFromSpoonacular, addRecipeToFirebase, addCustomRecipeToFirebaseCustomRecipes, getSavedRecipesFromFirebase } from "./recipesUtils";

export const setCurrentRecipe = (recipe) => dispatch => {
    dispatch({
        type: SET_CURRENT_RECIPE,
        payload: recipe
    })
}

export const setCurrentRecipeWithId = (recipeId) => async(dispatch) => {
    // console.log(recipeId);
    const [fullRecipeData] = await getFullRecipeInfoFromSpoonacular([{id: recipeId}]);
    // console.log(fullRecipeData);
    dispatch({
        type: SET_CURRENT_RECIPE_WITH_ID,
        payload: fullRecipeData
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

export const searchForRecipes = ({ searchQuery, dietTerm, allergiesTerm, mealTypesTerm }) => async (dispatch) => {
    console.log({ searchQuery, dietTerm, allergiesTerm, mealTypesTerm });
    const results = await fetchRecipeSearchResultsFromSpoonacular({ searchQuery, dietTerm, allergiesTerm, mealTypesTerm });
    dispatch({
        type: SEARCH_FOR_RECIPES,
        payload: {
            searchResults: results,
        }
    })
}