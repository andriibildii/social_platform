import { ResultCodesEnum } from "../api/api";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes, ProfileThunkType } from "./store";
import { profileAPI } from "../api/profileAPI";
import { ThunkDispatch } from "redux-thunk/src/types";

const initialState = {
    posts: [
        { id: 1, message: "Hello mates!", likesCount: 0 },
        { id: 2, message: "The first", likesCount: 23 },
        { id: 3, message: "OMG! It's so late", likesCount: 5 },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    hasError: false,
    errorLog: "",
};

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
type SaveProfileThunkType = ProfileThunkType<
    Promise<{ errorLog: string; hasError: boolean; type: string } | undefined>,
    ActionsType
>;

const profileReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "social-platform/profile-reducer/ADD-POST": {
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
        case "social-platform/profile-reducer/DELETE_POST": {
            return {
                ...state,
                posts: [
                    ...state.posts.filter((post) => post.id !== action.postId),
                ],
            };
        }
        case "social-platform/profile-reducer/SET_USER_PROFILE": {
            return {
                ...state,
                ...action.payload,
            };
        }
        case "social-platform/profile-reducer/SET_STATUS": {
            return {
                ...state,
                status: action.status,
            };
        }
        case "social-platform/profile-reducer/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                } as ProfileType,
            };
        }
        case "social-platform/profile-reducer/SET_ERROR":
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
export const actions = {
    addPostActionCreator: (newPostBody: string) =>
        ({
            type: "social-platform/profile-reducer/ADD-POST",
            newPostBody,
        } as const),
    deletePost: (postId: number) =>
        ({
            type: "social-platform/profile-reducer/DELETE_POST",
            postId,
        } as const),
    setUserProfile: (
        profile: ProfileType,
        hasError: boolean,
        errorLog: string
    ) =>
        ({
            type: "social-platform/profile-reducer/SET_USER_PROFILE",
            payload: { profile, hasError, errorLog },
        } as const),
    setUserStatus: (status: string) =>
        ({
            type: "social-platform/profile-reducer/SET_STATUS",
            status,
        } as const),
    savePhotoSuccess: (photos: PhotosType) =>
        ({
            type: "social-platform/profile-reducer/SAVE_PHOTO_SUCCESS",
            photos,
        } as const),
    setError: (hasError: boolean, errorLog: string) =>
        ({
            type: "social-platform/profile-reducer/SET_ERROR",
            hasError,
            errorLog,
        } as const),
};

// THUNKS
export const profileThunkCreator =
    (userId: number | null): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(response, false, ""));
    };

export const getStatusThunkCreator =
    (userId: number | null): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.getStatus(userId);
        dispatch(actions.setUserStatus(response));
    };

export const updateStatusThunkCreator =
    (status: string): ThunkType =>
    async (dispatch) => {
        try {
            const response = await profileAPI.updateStatus(status);
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.setUserStatus(status));
            } else {
                throw new Error(response.messages[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

export const saveMainPhotoThunkCreator =
    (file: File): ThunkType =>
    async (dispatch) => {
        const response = await profileAPI.saveMainPhoto(file);
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(response.data.photos));
        }
    };

export const saveProfileThunkCreator =
    (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile);

        if (response.resultCode === ResultCodesEnum.Success) {
            await dispatch(profileThunkCreator(userId));
        } else {
            dispatch(
                actions.setError(
                    true,
                    response.messages[response.messages.length - 1]
                )
            );
        }
    };

export default profileReducer;
