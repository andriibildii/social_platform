import {authUserDataThunkCreator} from "./auth-reducer";
import {AppStateType} from "./store";
import {ThunkAction} from "redux-thunk";

const INITIALIZED_SUCCESS = "SOCIAL_PLATFORM/APP-REDUCER/INITIALIZED_SUCCESS";

const initialState = {
    initialized: false,
};

type InitialStateType = typeof initialState;

/// REDUCER
type ActionsTypes = InitializedSuccessType;
const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessType => ({
    type: INITIALIZED_SUCCESS,
});

// THUNKS
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(authUserDataThunkCreator());
    promise.then(() => {
        dispatch(initializedSuccess());
    })

};

export default appReducer;
