const initialState = {
    currentUser: null,
    currentToken: '',
    error: ''
};

const authReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
               currentUser: action.data.user,
               currentToken: action.data.token,
               error: ''
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                error: action.data
            }
        default:
            return state;
    }
};

export default authReducer;