import api from "api/api_auth";


export const fetchUserSuccess = (data) => ({
    type: "LOGIN",
    data: data
});

export const fetchUserFailed = (data) => ({
    type: "LOGIN_FAILED",
    data: data
});

export const fetchUser = (username, password) => dispatch => {
    return api.login(username, password)
        .then(data => {
            dispatch(fetchUserSuccess(data));
        }).catch(error => dispatch(fetchUserFailed(error)));
}