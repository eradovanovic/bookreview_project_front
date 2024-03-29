import React from "react";
import {Route, Routes} from "react-router-dom";
import appInitializer from "./hoc/appInitializer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Search from "./pages/Search";
import BookCollection from "./pages/BookCollection";
import NewBook from "./pages/NewBook";
import NewAuthor from "./pages/NewAuthor";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import BookDetails from "./pages/BookDetails";
import AuthorDetails from "./pages/AuthorDetails";
import Profile from "./pages/Profile";
import DrawerAppBar from "./components/Layout/DrawerAppBar";
import Bestsellers from "./pages/Bestsellers";
import "./App.css";

const App = (props) => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/changePassword' element={<ChangePassword/>}/>
            <Route path='/' element={<DrawerAppBar/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/books' element={<Books/>}/>
                <Route path='/books/:id' element={<BookDetails/>}/>
                <Route path='/authors' element={<Authors/>}/>
                <Route path='/authors/:id' element={<AuthorDetails/>}/>
                <Route path='/users/:username' element={<Profile/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/bestsellers' element={<Bestsellers/>}/>
                <Route path='/collections/:username' element={<BookCollection/>}/>
                <Route path='/newBook' element={<NewBook/>}/>
                <Route path='/newAuthor' element={<NewAuthor/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default appInitializer(App);
