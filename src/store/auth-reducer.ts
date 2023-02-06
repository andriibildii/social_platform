import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./store";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    hasError: false as boolean,
    errorLog: "" as string | null,
    captchaUrl: null as string | null,
};

/// TYPES
type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

/// REDUCER
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "social-platform/auth/SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            };

        case "social-platform/auth/SET_ERROR":
            return {
                ...state,
                ...action.payload,
            };
        case "social-platform/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

/// ACTION CREATORS
const actions = {
    setAuthUserData: (
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
        hasError: boolean,
        errorLog: string
    ) => ({ type: "social-platform/auth/SET_USER_DATA", payload: { userId, email, login, isAuth, hasError, errorLog }} as const),
    setError: (hasError: boolean, errorLog: string) => ({type: "social-platform/auth/SET_ERROR", payload: { hasError, errorLog }} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: "social-platform/auth/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl }} as const),
};

// THUNKS
export const authUserDataThunkCreator = (): ThunkType => async (dispatch) => {
    const response = await authAPI.getAuth();
    if (response.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true, false, ""));
    }
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.resultCode === ResultCodesEnum.Success) {
            await dispatch(authUserDataThunkCreator());
        } else {
            if (
                response.resultCode ===
                ResultCodeForCaptchaEnum.CaptchaIsRequired
            ) {
                await dispatch(getCaptchaUrl());
            }
            dispatch(
                actions.setError(
                    true,
                    response.messages[response.messages.length - 1]
                )
            );
        }
    };

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false, false, ""));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
