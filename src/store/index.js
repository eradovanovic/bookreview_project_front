import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import authorsReducer from "./authors/authorsReducer";
import booksReducer from "./books/booksReducer";
import authReducer from "./auth/authReducer";

export const reducer = combineReducers({
    authorsReducer,
    booksReducer,
    authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState = {}) {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}