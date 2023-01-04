import { connect } from "react-redux";
import {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
} from "../../redux/users-reducer";
import { useEffect } from "react";
import UserItem from "./UserItem/UserItem";
import Preloader from "../../common/preloader/Preloader";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

const UsersContainer = ({
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    followUser,
    unFollowUser,
    isFetching,
    followingInProgress,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
}) => {
    useEffect(() => {
        getUsersThunkCreator(currentPage, pageSize);
    }, []);

    const onPageChanged = (page) => {
        getUsersThunkCreator(page, pageSize);
    };

    return (
        <>
            {isFetching && <Preloader />}
            <UserItem
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                users={users}
                unFollowUser={unFollowUser}
                followUser={followUser}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                followingInProgress={followingInProgress}
                unfollowThunkCreator={unfollowThunkCreator}
                followThunkCreator={followThunkCreator}
            />
        </>
    );
};

// const mapUsers = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     };
// };

const mapUsers = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose(
    connect(mapUsers, {
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator,
    }),
    // withAuthRedirect
)(UsersContainer);
