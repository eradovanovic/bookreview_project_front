import api from "api/api_auth";
import {mockUsers} from "../../api/mockAuth";

export const loginSuccess = data => ({
    type: "LOGIN",
    data: data
});

export const loginFailed = data => ({
    type: "LOGIN_FAILED",
    data: data
});

export const registerFailed = data => ({
    type: "REGISTER_FAILED",
    data: data
});

export const login = (username, password) => dispatch => {
    dispatch(logoutSuccess());
    return api.login(username, password)
        .then(data => {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            dispatch(loginSuccess(data));
        }).catch(error => dispatch(loginFailed(error)));
}

export const register = (name, surname, email, photo, username, password) => dispatch => {
    dispatch(logoutSuccess());
    return api.register(name, surname, email, photo, username, password)
        .then(data => {
            mockUsers.push(data.user);
            dispatch(login(data.user.username, data.user.password));
        }).catch(error => dispatch(registerFailed(error)));
}

export const logoutSuccess = () => ({
    type: 'CLEAR'
});

export const logout = () => dispatch => {
    dispatch(logoutSuccess())
}