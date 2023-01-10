export const getProfile = (state) => {
    return state.profilePage.profile;
};

export const getStatus = (state) => {
    return state.profilePage.status;
};

export const getAuthUserId = (state) => {
    return state.auth.userId;
};

export const getAuthInfo = (state) => {
    return state.auth.isAuth;
};

export const getError = (state) => {
    return state.profilePage.hasError;
};

export const getErrorLog = (state) => {
    return state.profilePage.errorLog;
};
