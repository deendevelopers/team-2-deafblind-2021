import { SET_SEARCH_RESULTS } from "./recipesActionTypes"
import { getSavedRecipesFromFirebase } from "./recipesUtils"

export const setSearchResults = (recipes) => dispatch => {
    dispatch({
        type: SET_SEARCH_RESULTS,
        payload: recipes
    })
}

