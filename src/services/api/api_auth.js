import { DEFAULT_AVATAR_PHOTO } from "constants/constants";
import axios from "services/axios.instance";

import {setAccessToken} from "../common";

const login = (username, password) => {
    return axios.post('/login', {
        username,
        password,
    })
        .then(res => {
            setAccessToken(res.token)
            return res
        })
}

const register = (name, surname, email, username, password) => {
    return axios.post('/register', {
        name: name,
        surname: surname,
        email: email,
        photo: DEFAULT_AVATAR_PHOTO,
        username: username,
        password: password,
    })
}

const getUserByUsername = username => {
    return axios.get(`/users/${username}`)
}

const getLoggedUser = () => {
    return axios.get('/me')
}


const updateUser = (username, name, surname, email, photo) => {
    return axios.patch(`/users/${username}/update`, {
        name,
        surname,
        email,
        photo,
    })
}

const changePassword = (username, oldPassword, password) => {
    return axios.put(`/users/${username}/passwords`, {
        password: oldPassword,
        newPassword: password
    })
}

const deleteUser = username => {
    return axios.delete(`users/${username}`)
}

const api = {
    login,
    register,
    getUserByUsername,
    getLoggedUser,
    updateUser,
    changePassword,
    deleteUser
}

export default api;
