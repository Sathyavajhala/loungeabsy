import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//import logger from "redux-logger";

import rootReducer from "../Reducers/index";

const initialState = {};
const middleware = [
  thunk,
 // logger // Allows action creators to return functions (not just plain objects)
];

/*const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;*/
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //devTools
  )
);

export default store;
