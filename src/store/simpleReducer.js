const initialState = {
    result: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_RESULT":
            return {
                result: action.payload,
            };
        default:
            return state;
    }
};