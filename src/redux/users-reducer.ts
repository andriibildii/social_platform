import { ResultCodesEnum} from "../api/api";
import { updateObjectInArray } from "../utils/object-helper";
import { UsersType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./store";
import { userAPI } from "../api/userAPI";
import { Dispatch } from "redux";

const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users ID
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

/// REDUCER
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "social-platform/users-reducer/FOLLOW":
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
        case "social-platform/users-reducer/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: false,
                }),
            };
        case "social-platform/users-reducer/SET_USERS":
            return {
                ...state,
                /// if we want to add users to our prev users
                // users: [...state.users, ...action.users],
                /// if we to add users instead of our prev users
                users: action.users,
            };

        case "social-platform/users-reducer/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.page,
            };

        case "social-platform/users-reducer/SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };

        case "social-platform/users-reducer/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case "social-platform/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS":
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
const actions = {
    followSuccess: (userId: number) => ({ type: "social-platform/users-reducer/FOLLOW", userId }as const),
    unFollowSuccess: (userId: number) => ({ type: "social-platform/users-reducer/UNFOLLOW", userId }as const),
    setUser: (users: Array<UsersType>) => ({ type: "social-platform/users-reducer/SET_USERS", users }as const),
    setCurrentPage: (page: number) => ({ type: "social-platform/users-reducer/SET_CURRENT_PAGE", page}as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "social-platform/users-reducer/SET_TOTAL_USERS_COUNT", totalUsersCount}as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "social-platform/users-reducer/TOGGLE_IS_FETCHING", isFetching}as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: "social-platform/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId}as const),

}

// THUNKS CREATORS & THUNKS
export const getUsersThunkCreator =
  (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
      dispatch(actions.toggleIsFetching(true));
      dispatch(actions.setCurrentPage(currentPage));
      const response = await userAPI.getUsers(currentPage, pageSize);
      dispatch(actions.toggleIsFetching(false));
      dispatch(actions.setUser(response.items));
      dispatch(actions.setTotalUsersCount(response.totalCount));
  };

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsType
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.follow.bind(userId),
      actions.followSuccess
    );
};

export const unfollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unFollow.bind(userId),
      actions.unFollowSuccess
    );
};

export default usersReducer;



// import { ResultCodesEnum} from "../api/api";
// import { updateObjectInArray } from "../utils/object-helper";
// import { UsersType } from "../types/types";
// import {Dispatch} from "redux";
// import { ThunkAction } from "redux-thunk";
// import { AppStateType } from "./store";
// import { userAPI } from "../api/userAPI";
//
// const FOLLOW = "FOLLOW";
// const UNFOLLOW = "UNFOLLOW";
// const SET_USERS = "SET_USERS";
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
// const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
//
// const initialState = {
//     users: [] as Array<UsersType>,
//     pageSize: 10,
//     totalUsersCount: 0,
//     currentPage: 1,
//     isFetching: false,
//     followingInProgress: [] as Array<number> // array of users ID
// };
//
// type InitialStateType = typeof initialState;
//
// /// REDUCER
// type ActionsTypes = FollowSuccessType | UnFollowSuccessType | SetUserType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingProgressType;
// const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
//     switch (action.type) {
//         case FOLLOW:
//             return {
//                 ...state,
//                 users: updateObjectInArray(state.users, action.userId, "id", {
//                     followed: true,
//                 }),
//                 // users: state.users.map((user) => {
//                 //     if (user.id === action.userId) {
//                 //         return { ...user, followed: true };
//                 //     }
//                 //     return user;
//                 // }),
//             };
//         case UNFOLLOW:
//             return {
//                 ...state,
//                 users: updateObjectInArray(state.users, action.userId, "id", {
//                     followed: false,
//                 }),
//             };
//         case SET_USERS:
//             return {
//                 ...state,
//                 /// if we want to add users to our prev users
//                 // users: [...state.users, ...action.users],
//                 /// if we to add users instead of our prev users
//                 users: action.users,
//             };
//
//         case SET_CURRENT_PAGE:
//             return {
//                 ...state,
//                 currentPage: action.page,
//             };
//
//         case SET_TOTAL_USERS_COUNT:
//             return {
//                 ...state,
//                 totalUsersCount: action.totalUsersCount,
//             };
//
//         case TOGGLE_IS_FETCHING:
//             return {
//                 ...state,
//                 isFetching: action.isFetching,
//             };
//
//         case TOGGLE_IS_FOLLOWING_PROGRESS:
//             return {
//                 ...state,
//                 followingInProgress: action.isFetching
//                     ? [...state.followingInProgress, action.userId]
//                     : state.followingInProgress.filter(
//                           (id) => id !== action.userId
//                       ),
//             };
//
//         default:
//             return state;
//     }
// };
//
// /// ACTION CREATORS
// type FollowSuccessType = {
//     type: typeof FOLLOW
//     userId: number
// }
// export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId });
//
// type UnFollowSuccessType = {
//     type: typeof UNFOLLOW
//     userId: number
// }
// export const unFollowSuccess = (userId: number): UnFollowSuccessType => ({ type: UNFOLLOW, userId });
//
// type SetUserType = {
//     type: typeof SET_USERS
//     users: Array<UsersType>
// }
// export const setUser = (users: Array<UsersType>): SetUserType => ({ type: SET_USERS, users });
//
// type SetCurrentPageType = {
//     type: typeof SET_CURRENT_PAGE
//     page: number
// }
// export const setCurrentPage = (page: number): SetCurrentPageType => ({
//     type: SET_CURRENT_PAGE,
//     page,
// });
//
// type SetTotalUsersCountType = {
//     type: typeof SET_TOTAL_USERS_COUNT
//     totalUsersCount: number
// }
// export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
//     type: SET_TOTAL_USERS_COUNT,
//     totalUsersCount,
// });
//
// type ToggleIsFetchingType = {
//     type: typeof TOGGLE_IS_FETCHING
//     isFetching: boolean
// }
// export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
//     type: TOGGLE_IS_FETCHING,
//     isFetching,
// });
//
// type ToggleFollowingProgressType = {
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
//     isFetching: boolean
//     userId: number
// }
// export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
//     type: TOGGLE_IS_FOLLOWING_PROGRESS,
//     isFetching,
//     userId,
// });
//
// // THUNKS CREATORS & THUNKS
// type DispatchType = Dispatch<ActionsTypes>;
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
//
// export const getUsersThunkCreator =
//   (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
//       dispatch(toggleIsFetching(true));
//       dispatch(setCurrentPage(currentPage));
//       const response = await userAPI.getUsers(currentPage, pageSize);
//       dispatch(toggleIsFetching(false));
//       dispatch(setUser(response.items));
//       dispatch(setTotalUsersCount(response.totalCount));
//   };
//
// const _followUnfollowFlow = async (
//   dispatch: DispatchType,
//   userId: number,
//   apiMethod: any,
//   actionCreator: (userId: number) => FollowSuccessType | UnFollowSuccessType
// ) => {
//     dispatch(toggleFollowingProgress(true, userId));
//     const response = await apiMethod(userId);
//     if (response.resultCode === ResultCodesEnum.Success) {
//         dispatch(actionCreator(userId));
//     }
//     dispatch(toggleFollowingProgress(false, userId));
// };
//
// export const followThunkCreator = (userId: number): ThunkType => async (dispatch) => {
//     await _followUnfollowFlow(
//       dispatch,
//       userId,
//       userAPI.follow.bind(userId),
//       followSuccess
//     );
// };
//
// export const unfollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
//     await _followUnfollowFlow(
//       dispatch,
//       userId,
//       userAPI.unFollow.bind(userId),
//       unFollowSuccess
//     );
// };
//
// export default usersReducer;
