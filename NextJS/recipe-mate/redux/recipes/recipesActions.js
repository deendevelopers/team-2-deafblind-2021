import { SET_SEARCH_RESULTS } from "./recipesActionTypes"

export const setSearchResults = (recipes) => dispatch => {
    dispatch({
        type: SET_SEARCH_RESULTS,
        payload: recipes
    })
}

