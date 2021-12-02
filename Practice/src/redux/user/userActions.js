import { SET_CURRENT_USER } from "./userTypes";

export const setCurrentUser = user => dispatch => {
    console.log("setCurrentUser action ran! with user", user)
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

