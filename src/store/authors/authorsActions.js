import api from "api/api";

export const fetchAuthorSuccess = data => ({
    type: "FETCH_AUTHOR",
    data: data
});

export const fetchAuthor = id => dispatch => {
    return api.getAuthorById(id)
        .then(data => {
            dispatch(fetchAuthorSuccess(data));
        })
}