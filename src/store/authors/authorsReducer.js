const initialState = {
    currentAuthor: {}
};

const authorsReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_AUTHOR":
            return {
                currentAuthor: action.data
            }
        default:
            return state;
    }
};

export default authorsReducer;