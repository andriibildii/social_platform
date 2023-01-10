import { authAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SET_ERROR = "SET_ERROR";

let initialState = {
    posts: [
        { id: 1, message: "Hello mates!", likesCount: 0 },
        { id: 2, message: "The first", likesCount: 23 },
        { id: 3, message: "OMG! It's so late", likesCount: 5 },
    ],
    profile: null,
    status: "",
    hasError: false,
    errorLog: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts[state.posts.length - 1].id + 1,
                        message: action.newPostBody,
                        likesCount: 6,
                    },
                ],
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts.filter((post) => post.id !== action.postId),
                ],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            };
        }
        case SET_ERROR:
            return {
                ...state,
                hasError: action.hasError,
                errorLog: action.errorLog,
            };
        default:
            return state;
    }
};

// ACTION CREATORS
export const addPostActionCreator = (newPostBody) => ({
    type: ADD_POST,
    newPostBody,
});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
});

const setUserProfile = (profile, hasError, errorLog) => ({
    type: SET_USER_PROFILE,
    payload: { profile, hasError, errorLog },
});

const setUserStatus = (status) => ({
    type: SET_STATUS,
    status,
});

const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
});

export const setError = (hasError, errorLog) => ({
    type: SET_ERROR,
    hasError,
    errorLog,
});

// THUNKS
export const profileThunkCreator = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response, "false", ""));
};

export const getStatusThunkCreator = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response));
};

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};

export const saveMainPhotoThunkCreator = (file) => async (dispatch) => {
    const response = await profileAPI.saveMainPhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfileThunkCreator =
    (profile) => async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            return dispatch(profileThunkCreator(userId));
        } else {
            return dispatch(setError(true, response.data.messages[response.data.messages.length - 1]));
        }
    };

export default profileReducer;
