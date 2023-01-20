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
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
// import * as queryString from 'querystring';

type QueryParamsType = {term?: string, page?: string, friend?: string}

export const UsersItems: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation()
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const query: QueryParamsType = {};
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        const queryString = '?' + new URLSearchParams(query).toString()
        navigate({
            pathname: '/users',
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            search: queryString
        });
    }, [filter, currentPage])

    useEffect(() => {
        /// with using useSearchParams()
        const parsed1 = Object.fromEntries([...searchParams])
        console.log('useSearchParams', parsed1);

        /// with using useLocation() and new URLSearchParams
        // const search = location.search;
        // const params = new URLSearchParams(search);
        // const parsed2 = Object.fromEntries(params) as QueryParamsType

        let actualPage = currentPage;
        let actualFilter = filter;
        if (!!parsed1.page) actualPage = Number(parsed1.page)
        if (!!parsed1.term) actualFilter = {...actualFilter, term: parsed1.term}
        if (!!parsed1.friend) actualFilter = {...actualFilter, friend: parsed1.friend === null ? null : parsed1.friend === 'true' ? true : false  }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
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
