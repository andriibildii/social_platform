import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "social-platform/auth/SET_USER_DATA";
const SET_ERROR = "social-platform/auth/SET_ERROR";
const GET_CAPTCHA_URL_SUCCESS = "social-platform/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    hasError: false,
    errorLog: "",
    captchaUrl: null
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
            case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

/// ACTION CREATORS
export const setAuthUserData = (
    userId,
    email,
    login,
    isAuth,
    hasError,
    errorLog
) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth, hasError, errorLog },
});

export const setError = (hasError, errorLog) => ({
    type: SET_ERROR,
    payload: { hasError, errorLog },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

// THUNKS

export const authUserDataThunkCreator = () => async (dispatch) => {
    const response = await authAPI.getAuth();
    if (response.resultCode === 0) {
        const { id, email, login } = response.data;
        dispatch(setAuthUserData(id, email, login, true, false, ""));
    }
};

export const loginThunkCreator =
    (email, password, rememberMe, captcha) => async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(authUserDataThunkCreator());
        } else if (response.data.resultCode !== 0) {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            dispatch(
                setError(
                    true,
                    response.data.messages[response.data.messages.length - 1]
                )
            );
        }
    };

export const logoutThunkCreator = () => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
