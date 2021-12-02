import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import Thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const middlewares = [Thunk];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
};

const store = createStore(rootReducer, applyMiddleware(...middlewares));


export { store };