import { ADD_RECIPE, SET_CURRENT_RECIPE } from "./recipesTypes";

export const setCurrentRecipe = (recipe) => dispatch => {
    
    dispatch({
        type: SET_CURRENT_RECIPE,
        payload: recipe
    })
}

export const addRecipe = (recipe) => async (dispatch) => {
    
    //Add to firebase

    // Add to redux
    dispatch({
        type: ADD_RECIPE,
        payload: recipe
    })
}