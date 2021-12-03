import { combineReducers } from "redux";
import recipesReducer from "./recipes/recipesReducer";
import userReducer from "./user/userReducer";


const rootReducer = combineReducers({
    user: userReducer,
    recipes: recipesReducer
})

export default rootReducer;