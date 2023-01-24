const initialState = {
    currentBook: {},
    bestsellers: null,
    bestsellersTitle: null,
    bestsellersPublishedDate: null
};

const booksReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_BOOK":
            return {
                ...state,
                currentBook: action.data
            }
        case "FETCH_BESTSELLERS":
            return  {
                ...state,
                bestsellers: action.data.books,
                bestsellersTitle: action.data.list_name,
                bestsellersPublishedDate: action.data.published_date
            }
        default:
            return state;
    }
};

export default booksReducer;
