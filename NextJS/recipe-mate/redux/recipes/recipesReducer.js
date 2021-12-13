import { SET_SEARCH_RESULTS } from "./recipesActionTypes";

const initialState = {
    searchResults: [],
}

const recipesReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            }
        default:
            return state
    }
}

export default recipesReducer;