import api from "api/api_auth";

export const fetchUserSuccess = data => ({
    type: "LOGIN",
    data: data
});

export const fetchUserFailed = data => ({
    type: "LOGIN_FAILED",
    data: data
});


export const addUserSuccess = data => ({
    type: "REGISTER",
    data: data
});

export const addUserFailed = data => ({
    type: "REGISTER_FAILED",
    data: data
});

export const fetchUser = (username, password) => dispatch => {
    return api.login(username, password)
        .then(data => {
            dispatch(fetchUserSuccess(data));
        }).catch(error => dispatch(fetchUserFailed(error)));
}

export const addUser = (name, surname, email, photo, username, password) => dispatch => {
    return api.register(name, surname, email, photo, username, password)
        .then(data => {
            dispatch(addUserSuccess(data));
        }).catch(error => dispatch(addUserFailed(error)));
}

export const logoutSuccess = () => ({
    type: 'LOGOUT'
});

export const logout = () => dispatch => {
    dispatch(logoutSuccess())
}