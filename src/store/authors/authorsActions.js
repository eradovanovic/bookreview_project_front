import {getAuthorById} from "api/api";

export const fetchAuthorSuccess = (data) => ({
    type: "FETCH_AUTHOR",
    data: data
});

export const fetchAuthor= (id, dispatch) => {
    return getAuthorById(id)
        .then(data => {
            dispatch(fetchAuthorSuccess(data));
        })
}