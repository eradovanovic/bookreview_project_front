import api from "services/api/api";

export const fetchBookSuccess = data => ({
    type: "FETCH_BOOK",
    data: data
});

export const fetchBook = id => dispatch => {
    return api.getBookById(+id)
        .then(bookData => {
            dispatch(fetchBookSuccess({ ...bookData }))
        })
}
