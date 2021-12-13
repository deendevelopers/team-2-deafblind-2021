import { combineReducers } from "redux";
import recipesReducer from "./recipes/recipesReducer";

const rootReducer = combineReducers({
    recipes: recipesReducer,
})

export default rootReducer;