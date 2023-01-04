import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_ERROR = "SET_ERROR";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    hasError: false,
    errorLog: '',
};

/// REDUCER
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };

        case SET_ERROR:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

/// ACTION CREATORS
export const setAuthUserData = (userId, email, login, isAuth, hasError, errorLog) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth, hasError, errorLog },
});

export const setError = (hasError, errorLog) => ({
    type: SET_ERROR,
    payload: { hasError, errorLog },
});

// THUNKS

export const authUserDataThunkCreator = () => (dispatch) => {
    authAPI.getAuth().then((data) => {
        if (data.resultCode === 0) {
            const { id, email, login } = data.data;
            dispatch(setAuthUserData(id, email, login, true, false, ''));
        }
    });
};

export const loginThunkCreator =
    (email, password, rememberMe) => (dispatch) => {
        authAPI.login(email, password, rememberMe).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authUserDataThunkCreator());
            }
            if (res.data.resultCode !== 0) {
                dispatch(setError(true, res.data.messages[res.data.messages.length - 1]))
            }
        });
    };

export const logoutThunkCreator = () => (dispatch) => {
    authAPI.logout().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
};

export default authReducer;
