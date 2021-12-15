import { SET_SEARCH_RESULTS, RESET_SEARCH } from "./recipesActionTypes"

export const resetSearch = () => dispatch => {
    dispatch({
        type: RESET_SEARCH
    })
}

export const setSearchResults = (recipes) => dispatch => {
    dispatch({
        type: SET_SEARCH_RESULTS,
        payload: recipes
    })
}

