import api from "services/api/api";
import {resultsInForm} from "../../services/api/bookAdapter";

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


export const fetchBestsellers = (type, genre) => dispatch => {
    return api.getBestsellers(type, genre)
        .then(data => {
            return dispatch(fetchBestsellersSuccess(resultsInForm(data.results)))
        })
}


const fetchBestsellersSuccess = data => ({
    type: "FETCH_BESTSELLERS",
    data: data
});
