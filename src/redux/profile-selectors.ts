import { AppStateType } from "./store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
};

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
};

export const getAuthUserId = (state: AppStateType) => {
    return state.auth.userId;
};

export const getAuthInfo = (state: AppStateType) => {
    return state.auth.isAuth;
};

export const getError = (state: AppStateType) => {
    return state.profilePage.hasError;
};

export const getErrorLog = (state: AppStateType) => {
    return state.profilePage.errorLog;
};
