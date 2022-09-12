import api from "api/api_copy";

export const results = data => ({
    type: "RESULTS",
    data: data
});

export const clear = () => ({
    type: "CLEAR"
});

export const search = input => dispatch => {
    return api.search(input)
        .then(data => {
            dispatch(results(data));
        })
}