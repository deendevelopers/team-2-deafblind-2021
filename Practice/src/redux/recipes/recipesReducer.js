import { ADD_RECIPE, SET_CURRENT_RECIPE } from "./recipesTypes";

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
        default:
            return state
    }
}

export default recipesReducer;