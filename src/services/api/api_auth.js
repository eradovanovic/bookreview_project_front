import { DEFAULT_AVATAR_PHOTO } from "constants/constants";
import axios from "services/axios.instance";

import { mockUsers } from "./mockAuth";
import {setAccessToken} from "../common";

const userInfoObject = (user) => {
    return {
        name: user.name,
        surname: user.surname,
        photo: user.photo,
        photoFile: user.photoFile,
        email: user.email,
        username: user.username,
        type: user.type
    }
}

const login = (username, password) => {
    return axios.post('/login', {
        username,
        password,
    })
        .then(res => {
            setAccessToken(res.token)
            return res
        })
    // const userRes = mockUsers.find(u => u.username === username && u.password === password);
    // if (userRes){
    //     return new Promise((res, rej) => {
    //         res({
    //             user: userInfoObject(userRes),
    //             token: 'fake token'});
    //     })
    // }
    // else {
    //     const error = new Error('Wrong username or password!');
    //     error.code = 401;
    //     return Promise.reject(error);
    // }
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
    // const userRes = mockUsers.find(u => u.username === username || u.email === email);
    // if(userRes){
    //     const error = new Error('Username or email is already in use!');
    //     error.code = 409;
    //     return Promise.reject(error);
    // }
    // else {
    //     const newUser = {
    //         name: name,
    //         surname: surname,
    //         email: email,
    //         photo: DEFAULT_AVATAR_PHOTO,
    //         username: username,
    //         password: password,
    //         type: 'user'
    //     };
    //     mockUsers.push(newUser);
    //     return new Promise((res, rej) => {
    //         res({
    //                 user: userInfoObject(newUser),
    //                 token: 'fake token'
    //             });
    //     })
    // }
}

const getUserByUsername = username => {
    return axios.get(`/users/${username}`)
    // const user = mockUsers.find(user => user.username === username);
    // if (user) {
    //     return new Promise((res, rej) => {
    //         res(userInfoObject(user));
    // }
    // else {
    //     return new Promise((res, rej) => {
    //         res(user);
    //     })
    // }
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
    // const index = mockUsers.findIndex(u => u.username === username);
    // const user = mockUsers.find(u => email !== mockUsers[index].email && u.email === email);
    // if (!user) {
    //     mockUsers[index].name = name;
    //     mockUsers[index].surname = surname;
    //     mockUsers[index].photo = photo ? photo.name : mockUsers[index].photo;
    //     mockUsers[index].photoFile = photo ? URL.createObjectURL(photo) : null;
    //     mockUsers[index].email = email;
    //     return new Promise((res, rej) => {
    //         res(userInfoObject(mockUsers[index]));
    //     })
    // }
    // else {
    //     const error = new Error("This mail is already in use!")
    //     error.code = 409;
    //     return Promise.reject(error);
    // }
}

const changePassword = (username, oldPassword, password) => {
    return axios.put(`/users/${username}/passwords`, {
        password: oldPassword,
        newPassword: password
    })
    // const index = mockUsers.findIndex(u => u.username === username);
    // if (mockUsers[index].password === oldPassword) {
    //     mockUsers[index].password = password;
    //     return new Promise((res, rej) => {
    //         res(userInfoObject(mockUsers[index]));
    //     })
    // }
    // else {
    //     const error = new Error("Incorrect old password!")
    //     error.code = 401;
    //     return Promise.reject(error);
    // }
}

const deleteUser = username => {
    return axios.delete(`users/${username}`)
    // const index = mockUsers.findIndex(user => user.username === username);
    // mockUsers.splice(index, 1);
    // return new Promise((res, rej) => {
    //     res(username);
    // })
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
