import { authUserDataThunkCreator } from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./store";
import { ThunkAction } from "redux-thunk";

const initialState = {
    initialized: false,
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

/// REDUCER
const appReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "SOCIAL_PLATFORM/APP-REDUCER/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
};

/// ACTION CREATORS
export const actions = {
    initializedSuccess: () =>
        ({ type: "SOCIAL_PLATFORM/APP-REDUCER/INITIALIZED_SUCCESS" } as const),
};

// THUNKS
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;
export const initializeApp = (): ThunkType => (dispatch) => {
    const promise = dispatch(authUserDataThunkCreator());
    promise.then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default appReducer;
