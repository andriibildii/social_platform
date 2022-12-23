import { connect } from "react-redux";
import {
    setCurrentPage,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
} from "../../redux/users-reducer";
import { useEffect } from "react";
import UserItem from "./UserItem/UserItem";
import Preloader from "../../common/preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

const UsersContainer = ({
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    followUser,
    unFollowUser,
    setCurrentPage,
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
        setCurrentPage(page);
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

const mapUsers = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};

export default compose(
    connect(mapUsers, {
        setCurrentPage,
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator,
    }),
    withAuthRedirect
)(UsersContainer);

/// VERSION WITHOUT COMPOSE
// const AuthRedirectComponent = withAuthRedirect(UsersContainer);
// // the second parameter of connect its object that contain links to the Action Creator.
// // Connect automatically do callback above each Action Creator and do dispatch by itself
// export default connect(mapUsers, {
// 	setCurrentPage,
// 	getUsersThunkCreator,
// 	followThunkCreator,
// 	unfollowThunkCreator
// })(AuthRedirectComponent);
