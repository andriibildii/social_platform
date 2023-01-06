import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
    posts: [
        { id: 1, message: "Hello mates!", likesCount: 0 },
        { id: 2, message: "The first", likesCount: 23 },
        { id: 3, message: "OMG! It's so late", likesCount: 5 },
    ],
    profile: null,
    status: "",
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
                profile: action.profile,
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }
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

const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile,
});

const setUserStatus = (status) => ({
    type: SET_STATUS,
    status,
});

// THUNKS
export const profileThunkCreator = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
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

export default profileReducer;
