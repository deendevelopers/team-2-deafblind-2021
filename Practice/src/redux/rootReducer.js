import { combineReducers } from "redux";
import recipesReducer from "./recipes/recipesReducer";
import userReducer from "./user/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "recipes"]
};

const rootReducer = combineReducers({
    user: userReducer,
    recipes: recipesReducer
})

export default persistReducer(persistConfig, rootReducer);