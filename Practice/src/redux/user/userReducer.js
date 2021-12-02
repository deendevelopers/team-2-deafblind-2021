import { SET_CURRENT_USER } from "./userTypes";

const initialState = {
    currentUser: null,
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_USER:{
            console.log(action.payload);
            return {
                ...state,
                currentUser: action.payload
            }}
        default:
            return state
    }
}

export default userReducer;