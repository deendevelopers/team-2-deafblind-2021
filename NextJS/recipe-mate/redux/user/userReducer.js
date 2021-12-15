import { SET_CURRENT_USER, SAVE_RECIPE_WITH_SIGN_IN } from "./userActionTypes";

const initialState = {
    currentUser: null,
    saveRecipeWithSignIn: false,
    recipeSlugToSaveWithSignIn: [],
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case SAVE_RECIPE_WITH_SIGN_IN:
            return {
                ...state,
                saveRecipeWithSignIn: true,
                recipeSlugToSaveWithSignIn: action.payload,
            }
        default:
            return state
    }
}

export default userReducer;