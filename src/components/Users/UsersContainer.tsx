import { useEffect, ComponentType, FC } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import UsersItems from "./UsersItems/UsersItems";
import Preloader from "../../common/Preloader/Preloader";
import {
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
} from "../../redux/users-reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selectors";
import { AppStateType } from "../../redux/store";
import { UsersType } from "../../types/types";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
}

type PropsTypes = MapStateToPropsType & MapDispatchToPropsType

const UsersContainer: FC<PropsTypes> = ({
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    isFetching,
    followingInProgress,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
}) => {

    useEffect(() => {
        getUsersThunkCreator(currentPage, pageSize);
    }, []);

    const onPageChanged = (page: number) => {
        getUsersThunkCreator(page, pageSize);
    };

    return (
        <>
            {isFetching && <Preloader />}
            <UsersItems
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                users={users}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                followingInProgress={followingInProgress}
                unfollowThunkCreator={unfollowThunkCreator}
                followThunkCreator={followThunkCreator}
            />
        </>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, undefined, AppStateType >(mapStateToProps, {
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator,
    }),
    withAuthRedirect
)(UsersContainer);
