const initialState = {
    currentBook: {}
};

const booksReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_BOOK":
            return {
                currentBook: action.data
            }
        default:
            return state;
    }
};

export default booksReducer;