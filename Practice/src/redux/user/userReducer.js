import { ADD_RECIPE_TO_USER_SAVED_RECIPES, SET_CURRENT_USER } from "./userTypes";
import { addNewRecipe } from "./userUtils";

const initialState = {
    currentUser: null
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case ADD_RECIPE_TO_USER_SAVED_RECIPES:
            return {
                ...state, 
                currentUser: {
                    ...state.currentUser,
                    savedRecipes: addNewRecipe(state.currentUser.savedRecipes, action.payload)
                }
            }
        default:
            return state
    }
}

export default userReducer;