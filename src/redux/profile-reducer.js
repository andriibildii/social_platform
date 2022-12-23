import { userAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
    posts: [
        { id: 1, message: "Hello mates!", likesCount: 0 },
        { id: 2, message: "The first", likesCount: 23 },
        { id: 3, message: "OMG! It's so late", likesCount: 5 },
    ],
    newPostText: "",
    profile: null,
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
                        message: state.newPostText,
                        likesCount: 6,
                    },
                ],
                newPostText: "",
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.text,
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            };
        }
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    text: text,
});
const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile,
});

export const profileThunkCreator = (userId) => {
    return (dispatch) => {
        userAPI.getProfile(userId)
          .then((data) => dispatch(setUserProfile(data)));
    };
};

export default profileReducer;
