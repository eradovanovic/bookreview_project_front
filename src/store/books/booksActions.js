import api from "api/api";

export const fetchBookSuccess = data => ({
    type: "FETCH_BOOK",
    data: data
});

export const fetchBook = id => dispatch => {
    return api.getBookById(+id)
        .then(bookData => {
            api.getAuthorById(bookData.author_id)
                .then(authorData => dispatch(fetchBookSuccess({ ...bookData, author: authorData.name})))
        })
}
