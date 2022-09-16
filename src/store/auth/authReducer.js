const initialState = {
    user: null,
    token: '',
    error: {}
};

const authReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
               user: action.data.user,
               token: action.data.token,
               error: {}
            }
        case "UPDATE":
            return {
                ...state,
                user: action.data,
                token: state.token,
                error: {}
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                error: action.data
            }
        case "REGISTER_FAILED":
            return {
                ...state,
                error: action.data
            }
        case "UPDATE_FAILED":
            return {
                ...state,
                error: action.data
            }
        case "CLEAR":
            return {
                user: null,
                token: '',
                error: {}
            }
        default:
            return state;
    }
};

export default authReducer;