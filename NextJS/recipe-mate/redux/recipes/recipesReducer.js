import { RESET_SEARCH, SET_SEARCH_RESULTS } from "./recipesActionTypes";

const initialState = {
    startSearch: false,
    searchResults: [],
}

const recipesReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload,
                startSearch: true
            }
        case RESET_SEARCH:
            return {
                ...state, 
                startSearch: false,
            }
        default:
            return state
    }
}

export default recipesReducer;