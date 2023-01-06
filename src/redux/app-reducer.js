import { authUserDataThunkCreator } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
    initialized: false,
};

/// REDUCER
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
};

/// ACTION CREATORS
export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
});

// THUNKS
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(authUserDataThunkCreator());
    promise.then(() => {
        dispatch(initializedSuccess());
    })

};

export default appReducer;
