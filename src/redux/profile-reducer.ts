import {ResultCodesEnum} from "../api/api";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import { profileAPI } from "../api/profileAPI";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SET_ERROR = "SET_ERROR";

const initialState = {
    posts: [
        {id: 1, message: "Hello mates!", likesCount: 0},
        {id: 2, message: "The first", likesCount: 23},
        {id: 3, message: "OMG! It's so late", likesCount: 5},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    hasError: false,
    errorLog: "",
};

export type InitialStateType = typeof initialState;

type ActionsTypes = AddPostActionCreatorType | DeletePostType | SetUserProfileType | SetUserStatusType | SavePhotoSuccessType | SetErrorType;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
                profile: {...state.profile, photos: action.photos},
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

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPostActionCreator = (newPostBody: string): AddPostActionCreatorType => ({
    type: ADD_POST,
    newPostBody,
});

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({
    type: DELETE_POST,
    postId,
});

type SetUserProfilePayloadType = {
    profile: ProfileType
    hasError: boolean
    errorLog: string
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    payload: SetUserProfilePayloadType
}
const setUserProfile = (profile: ProfileType, hasError: boolean, errorLog: string): SetUserProfileType => ({
    type: SET_USER_PROFILE,
    payload: {profile, hasError, errorLog},
});

type SetUserStatusType = {
    type: typeof SET_STATUS
    status: string
}
const setUserStatus = (status: string): SetUserStatusType => ({
    type: SET_STATUS,
    status,
});

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
});

type SetErrorType = {
    type: typeof SET_ERROR
    hasError: boolean
    errorLog: string
}
export const setError = (hasError: boolean, errorLog: string): SetErrorType => ({
    type: SET_ERROR,
    hasError,
    errorLog,
});

// THUNKS
type GetStateType = () => AppStateType;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const profileThunkCreator = (userId: number | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response, false, ""));
};

export const getStatusThunkCreator = (userId: number | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response));
};

export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserStatus(status));
        } else {
            throw response.messages[0];
        }
    } catch (error) {
        console.error(error);
    }
};

export const saveMainPhotoThunkCreator = (file: any): ThunkType => async (dispatch) => {
    const response = await profileAPI.saveMainPhoto(file);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
};

export const saveProfileThunkCreator =
  (profile: ProfileType): ThunkType => async (dispatch, getState: GetStateType) => {
      const userId = getState().auth.userId;
      const response = await profileAPI.saveProfile(profile);
      if (response.resultCode === ResultCodesEnum.Success) {
          return dispatch(profileThunkCreator(userId));
      } else {
          return dispatch(
            setError(
              true,
              response.messages[response.messages.length - 1]
            )
          );
      }
  };

export default profileReducer;
