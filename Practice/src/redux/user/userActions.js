import { ADD_RECIPE_TO_USER_SAVED_RECIPES, SET_CURRENT_USER } from "./userTypes";
import { addRecipeToUserSavedRecipesInFirebase } from "../../firebase/firebaseUtils";

export const setCurrentUser = user => async (dispatch) => {
    // user object includes saved recipes too - therefore this will be set too
    // upon successful login
    console.log("setCurrentUser action ran! with user", user)
    
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

export const addRecipeToUserSavedRecipes = ({ userId, recipeId }) => async (dispatch) => {
    console.log("ran addRecipeToUserSavedRecipes")
    // Add/save recipe to user saved recipes in firebase 
    await addRecipeToUserSavedRecipesInFirebase(userId, recipeId);
    // Add/save recipe to user saved recipes in redux i.e. by dispatching an action
    dispatch({
        type: ADD_RECIPE_TO_USER_SAVED_RECIPES,
        payload: recipeId
    })
}

