import {getBookById} from "api/api";

export const fetchBookSuccess = (data) => ({
    type: "FETCH_BOOK",
    data: data
});

export const fetchBook = (id) => dispatch => {
    return getBookById(id)
        .then(data => {
            dispatch(fetchBookSuccess(data));
        })
}