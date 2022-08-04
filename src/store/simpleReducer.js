const initialState = {
    result: ""
};

const simpleReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "SET_RESULT":
            return {
                result: action.payload,
            };
        default:
            return state;
    }
};

export default simpleReducer;