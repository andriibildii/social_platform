import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

/// REDUCER
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: true,
                }),
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: true };
                //     }
                //     return user;
                // }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: false,
                }),
            };
        case SET_USERS:
            return {
                ...state,
                /// if we want to add users to our prev users
                // users: [...state.users, ...action.users],
                /// if we to add users instead of our prev users
                users: action.users,
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };

        default:
            return state;
    }
};

/// ACTION CREATORS
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUser = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    page,
});
export const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});

// THUNKS
export const getUsersThunkCreator =
    (currentPage, pageSize) => async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        const data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUser(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };

const followUnfollowFlow = async (
    dispatch,
    userId,
    apiMethod,
    actionCreator
) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId) => async (dispatch) => {
    followUnfollowFlow(
        dispatch,
        userId,
        userAPI.follow.bind(userId),
        followSuccess
    );
};

export const unfollowThunkCreator = (userId) => async (dispatch) => {
    followUnfollowFlow(
        dispatch,
        userId,
        userAPI.unFollow.bind(userId),
        unFollowSuccess
    );
};

export default usersReducer;
