import { ADD_RECIPE, GET_SAVED_RECIPES_FROM_FIREBASE, SEARCH_FOR_RECIPES, SET_CURRENT_RECIPE, SET_CURRENT_RECIPE_WITH_ID } from "./recipesTypes";
import { addRecipesToSavedRecipes } from "./recipesUtils";

const initialState = {
    currentRecipe: {},
    savedRecipes: [],
    searchResults: []
}

const recipesReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload
            }
        case SET_CURRENT_RECIPE_WITH_ID:
            return{
                ...state,
                currentRecipe: state.savedRecipes.find(recipe => recipe.id == action.payload)
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
        case SEARCH_FOR_RECIPES:
            return {
                ...state,
                searchResults: action.payload.searchResults,
                savedRecipes: action.payload.savedRecipes
            }
        default:
            return state
    }
}

export default recipesReducer;