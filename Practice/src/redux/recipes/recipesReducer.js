import { ADD_RECIPE, GET_SAVED_RECIPES_FROM_FIREBASE, SET_CURRENT_RECIPE } from "./recipesTypes";
import { addRecipesToSavedRecipes } from "./recipesUtils";

const initialState = {
    currentRecipe: {},
    savedRecipes: []
}

const recipesReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload
            }
        case ADD_RECIPE:
            return {
                ...state,
                savedRecipes: addRecipesToSavedRecipes(state.savedRecipes, action.payload)
            }
        case GET_SAVED_RECIPES_FROM_FIREBASE:
            return {
                ...state,
                savedRecipes: action.payload || []
            }
        default:
            return state
    }
}

export default recipesReducer;