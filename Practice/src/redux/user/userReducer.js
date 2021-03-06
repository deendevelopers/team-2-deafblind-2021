import { ADD_RECIPE_TO_USER_SAVED_RECIPES, SAVE_RECIPE_WITH_SIGN_IN, SET_CURRENT_USER } from "./userTypes";
import { addNewRecipeId } from "./userUtils";

const initialState = {
    currentUser: null,
    saveRecipeWithSignIn: false
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
                    savedRecipesIds: addNewRecipeId(state.currentUser.savedRecipesIds, action.payload)
                },
                saveRecipeWithSignIn: false
            }
        case SAVE_RECIPE_WITH_SIGN_IN:
            return {
                ...state,
                saveRecipeWithSignIn: true
            }
        default:
            return state
    }
}

export default userReducer;