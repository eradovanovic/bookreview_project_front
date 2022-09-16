import api from "api/api_auth";

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
        .then(data => {
            localStorage.setItem("user", data.user.username);
            localStorage.setItem("token", data.token);
            dispatch(loginSuccess(data));
        }).catch(error => dispatch(loginFailed(error)));
}

export const register = (name, surname, email, photo, username, password) => dispatch => {
    dispatch(logoutSuccess());
    return api.register(name, surname, email, photo, username, password)
        .then(data => {
            dispatch(login(data.user.username, password));
        }).catch(error => dispatch(registerFailed(error)));
}

export const logoutSuccess = () => ({
    type: 'CLEAR'
});

export const logout = () => dispatch => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutSuccess())
}

export const update = (username, name, surname, email, photo) => dispatch => {
    return api.updateUser(username, name, surname, email, photo).then(data => {
        localStorage.setItem("user", data.username);
        dispatch(updateSuccess(data));
    }).catch(error => dispatch(updateFailed(error)));
}