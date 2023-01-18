import { FC, useEffect } from "react";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User/User";
import Card from "@mui/material/Card";
import { UsersSearchForm } from "./UsersSearchForm/UsersSearchForm";
import {
    FilterType,
    getUsersThunkCreator,
    followThunkCreator, unfollowThunkCreator
} from "../../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
} from "../../../redux/users-selectors";
import { AppDispatch } from "../../../redux/store";

export const UsersItems: FC = () => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    };

    const follow = (userId: number) => {
        dispatch(followThunkCreator(userId));
    };

    const unfollow = (userId: number) => {
        dispatch(unfollowThunkCreator(userId));
    };

    return (
        <Card sx={{ minHeight: 796 }}>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
                <Paginator
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    portionSize={10}
                />
                <div>
                    {users.map((user) => (
                        <User
                            key={user.id}
                            user={user}
                            followingInProgress={followingInProgress}
                            followThunkCreator={follow}
                            unfollowThunkCreator={unfollow}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
};
