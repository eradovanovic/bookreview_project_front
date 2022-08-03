export const setResult = (result) => (dispatch) => {
    dispatch({
        type: "SET_RESULT",
        payload: result ,
    });
};
