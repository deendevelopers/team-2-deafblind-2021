import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import Thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./rootReducer";

const middlewares = [Thunk];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

export { store, persistor };