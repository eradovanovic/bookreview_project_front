const initialState = {
    books: []
};

const searchReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "RESULTS":
            return {
                books: action.data
            }
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
};

export default searchReducer;