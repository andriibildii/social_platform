import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SET_USER_DATA = "social-platform/auth/SET_USER_DATA";
const SET_ERROR = "social-platform/auth/SET_ERROR";
const GET_CAPTCHA_URL_SUCCESS = "social-platform/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    hasError: false as boolean,
    errorLog: "" as string | null,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

/// REDUCER
type ActionsTypes = SetAuthUserDataType | SetErrorType | GetCaptchaUrlSuccessType;
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
type SetDataUserActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    hasError: boolean,
    errorLog: string
}
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetDataUserActionPayloadType
}
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  hasError: boolean,
  errorLog: string
): SetAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth, hasError, errorLog},
});

type SetErrorActionPayloadType = {
    hasError: boolean,
    errorLog: string
}
type SetErrorType = {
    type: typeof SET_ERROR,
    payload: SetErrorActionPayloadType
}
export const setError = (hasError: boolean, errorLog: string): SetErrorType => ({
    type: SET_ERROR,
    payload: {hasError, errorLog},
});

type GetCaptchaUrlSuccessPayloadType = {
    captchaUrl: string,
}
type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: GetCaptchaUrlSuccessPayloadType
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl},
});

// THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
export const authUserDataThunkCreator = (): ThunkType => async (dispatch) => {
    const response = await authAPI.getAuth();
    if (response.resultCode === ResultCodesEnum.Success) {
        const {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true, false, ""));
    }
};

export const loginThunkCreator =
  (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
      const response = await authAPI.login(
        email,
        password,
        rememberMe,
        captcha
      );
      if (response.resultCode === ResultCodesEnum.Success) {
          await dispatch(authUserDataThunkCreator());
      } else {
          if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
              await dispatch(getCaptchaUrl());
          }
          dispatch(
            setError(
              true,
              response.messages[response.messages.length - 1]
            )
          );
      }
  };

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false, false, ''));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
