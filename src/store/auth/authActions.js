import api from "services/api/api_auth";
import {setAccessToken} from "services/common";

export const loginSuccess = data => ({
    type: "LOGIN",
    data: data
});

export const updateSuccess = data => ({
    type: "UPDATE",
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

export const updateFailed = data => ({
    type: "UPDATE_FAILED",
    data: data
});

export const login = (username, password) => dispatch => {
    dispatch(logoutSuccess());
    return api.login(username, password)
        .then(result => {
            localStorage.setItem("token", result.token);
            dispatch(loginSuccess(result));
        }).catch(error => dispatch(loginFailed(error)));
}

export const register = (name, surname, email, photo, username, password) => dispatch => {
    dispatch(logoutSuccess());
    return api.register(name, surname, email, photo, username, password)
        .then(data => {
            dispatch(login(data.username, data.password));
        }).catch(error => dispatch(registerFailed(error)));
}

export const logoutSuccess = () => ({
    type: 'CLEAR'
});

export const clearError = () => ({
    type: 'CLEAR_ERROR'
});

export const logout = () => dispatch => {
   localStorage.removeItem("token");
   setAccessToken()
    dispatch(logoutSuccess());
}

export const update = (username, name, surname, email, photo) => dispatch => {
   return api.updateUser(username, name, surname, email, photo)
       .then(() => {
           return api.getLoggedUser()
               .then(data => dispatch(updateSuccess(data.user)))
       })
        .catch(error => dispatch(updateFailed(error)));
}
