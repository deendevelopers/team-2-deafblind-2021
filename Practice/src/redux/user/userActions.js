import { ADD_RECIPE_TO_USER_SAVED_RECIPES, DELETE_RECIPE_FROM_USER_SAVED_RECIPES, SAVE_RECIPE_WITH_SIGN_IN, SET_CURRENT_USER } from "./userTypes";
import { addRecipeIdToUserSavedRecipesIdsInFirebase, deleteRecipeIdToUserSavedRecipesIdsInFirebase } from "./userUtils";

export const setCurrentUser = user => async (dispatch) => {
    // user object includes saved recipes too - therefore this will be set too
    // upon successful login
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

export const addRecipeIdToUserSavedRecipesIds = ({ userId, recipeId }) => async (dispatch) => {
    console.log("ran addRecipeToUserSavedRecipesIds")
    // Add/save recipe to user saved recipes in firebase 
    await addRecipeIdToUserSavedRecipesIdsInFirebase(userId, recipeId);
    // Add/save recipe to user saved recipes in redux i.e. by dispatching an action
    dispatch({
        type: ADD_RECIPE_TO_USER_SAVED_RECIPES,
        payload: recipeId
    })
}

export const saveRecipeWithSignIn = () => (dispatch) => {
    return dispatch({
        type: SAVE_RECIPE_WITH_SIGN_IN
    })
}

export const deleteRecipeIdToUserSavedRecipesIds = ({ userId, recipeId }) => async (dispatch) => {
    await deleteRecipeIdToUserSavedRecipesIdsInFirebase(userId, recipeId);
    dispatch({
        type: DELETE_RECIPE_FROM_USER_SAVED_RECIPES
    })
}
