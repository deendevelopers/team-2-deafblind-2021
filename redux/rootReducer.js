import { combineReducers } from "redux";
import recipesReducer from "./recipes/recipesReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    recipes: recipesReducer,
    user: userReducer,
})

export default rootReducer;