import api from "api/api";

export const results = data => ({
    type: "RESULTS",
    data: data
});

export const clear = () => ({
    type: "CLEAR_SEARCH"
});

export const search = input => dispatch => {
    return api.search(input)
        .then(data => {
            dispatch(results(data));
        })
}