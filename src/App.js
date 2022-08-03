import React from "react";
import { Provider } from "react-redux";
import ActionComponent from "./components/ActionComponent";
import "./App.css";
import configureStore from "./store/index";

const store = configureStore();

const App = (props) => {
    return (
        <Provider store={store}>
            <ActionComponent />
        </Provider>
    );
};

export default App;