import React from "react";
import { Provider } from "react-redux";
import {Route, Routes} from "react-router-dom";

import "./App.css";
import configureStore from "./store/index";
import Home from "./pages/Home/Home";
import Action from "./pages/Action/Action";
import Login from "./pages/Login/Login";
import MainHeader from "./components/Layout/MainHeader/MainHeader";
import Register from "./pages/Register/Register";
import Books from "./pages/Books/Books";
import Authors from "./pages/Authors/Authors";
import Search from "./pages/Search/Search";
import BookCollection from "./pages/BookCollection/BookCollection";
import NewBook from "./pages/NewBook/NewBook";
import NewAuthor from "./pages/NewAuthor/NewAuthor";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import NotFound from "./pages/NotFound/NotFound";


const store = configureStore();

const App = (props) => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<MainHeader/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/books' element={<Books/>}/>
                    <Route path='/authors' element={<Authors/>}/>
                    <Route path='/search' element={<Search/>}/>
                    <Route path='/collection' element={<BookCollection/>}/>
                    <Route path='/newBook' element={<NewBook/>}/>
                    <Route path='/newAuthor' element={<NewAuthor/>}/>
                    <Route path='/changePassword' element={<ChangePassword/>}/>
                    <Route path='/action' element={<Action/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </Provider>
    );
};

export default App;