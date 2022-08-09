import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import simpleReducer from "./simpleReducer/simpleReducer";
import authorsReducer from "./authors/authorsReducer";
import booksReducer from "./books/booksReducer";

export const reducer = combineReducers({
    simpleReducer,
    authorsReducer,
    booksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState = {}) {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}