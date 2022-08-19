const initialState = {
    loggedUser: null,
    loggedToken: '',
    registeredUser: null,
    registeredToken: '',
    error: ''
};

const authReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
               loggedUser: action.data.user,
               loggedToken: action.data.token,
               error: ''
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                error: action.data
            }
        case "REGISTER":
            return {
                ...state,
                registeredUser: action.data.user,
                registeredToken: action.data.token,
                error: ''
            }
        case "REGISTER_FAILED":
            return {
                ...state,
                error: action.data
            }
        case "LOGOUT":
            return {
                ...state,
                loggedUser: null,
                loggedToken: '',
                error: ''
            }
        default:
            return state;
    }
};

export default authReducer;