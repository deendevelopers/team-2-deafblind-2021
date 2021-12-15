import { SET_CURRENT_USER, ADD_RECIPE_TO_USER_SAVED_RECIPES, DELETE_RECIPE_FROM_USER_SAVED_RECIPES } from "./userActionTypes";
import { addRecipeSlugToUserSavedRecipesSlugsInFirebase, deleteRecipeSlugFromUserSavedRecipesSlugsInFirebase } from "./userUtils";

export const setCurrentUser = user => async (dispatch) => {
    // user object includes saved recipes too - therefore this will be set too
    // upon successful login
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

export const addRecipeSlugToUserSavedRecipesSlugs = ({ userId, recipeSlug }) => async (dispatch) => {
    console.log("ran addRecipeToUserSavedRecipesSlugs")
    // Add/save recipe to user saved recipes in firebase 
    await addRecipeSlugToUserSavedRecipesSlugsInFirebase(userId, recipeSlug);
    // Add/save recipe to user saved recipes in redux i.e. by dispatching an action
    dispatch({
        type: ADD_RECIPE_TO_USER_SAVED_RECIPES,
    })
}

export const deleteRecipeSlugFromUserSavedRecipesSlugs = ({ userId, recipeSlug }) => async (dispatch) => {
    await deleteRecipeSlugFromUserSavedRecipesSlugsInFirebase(userId, recipeSlug);
    dispatch({
        type: DELETE_RECIPE_FROM_USER_SAVED_RECIPES
    })
}