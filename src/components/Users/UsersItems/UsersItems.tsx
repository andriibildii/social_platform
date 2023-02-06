import { FC, useEffect } from "react";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User/User";
import Card from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { UsersSearchForm } from "./UsersSearchForm/UsersSearchForm";
import {
    FilterType,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator,
} from "../../../store/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
} from "../../../store/users-selectors";
import { AppDispatch } from "../../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// import * as queryString from 'querystring';

type QueryParamsType = { term?: string; page?: string; friend?: string };

export const UsersItems: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const query: QueryParamsType = {};
        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);
        const queryString = "?" + new URLSearchParams(query).toString();
        navigate({
            pathname: "/users",
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            search: queryString,
        });
    }, [filter, currentPage]);

    useEffect(() => {
        /// with using useSearchParams()
        const parsed1 = Object.fromEntries([...searchParams]);

        /// with using useLocation() and new URLSearchParams
        // const search = location.search;
        // const params = new URLSearchParams(search);
        // const parsed2 = Object.fromEntries(params) as QueryParamsType

        let actualPage = currentPage;
        let actualFilter = filter;
        if (!!parsed1.page) actualPage = Number(parsed1.page);
        if (!!parsed1.term)
            actualFilter = { ...actualFilter, term: parsed1.term };
        if (!!parsed1.friend)
            actualFilter = {
                ...actualFilter,
                friend:
                    parsed1.friend === null
                        ? null
                        : parsed1.friend === "true"
                        ? true
                        : false,
            };

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
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                rowSpacing={1}
            >
                <Grid item xs={10} md={12}>
                    <Card
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <UsersSearchForm onFilterChanged={onFilterChanged} />
                    </Card>
                </Grid>
                <Grid item xs={10} md={12}>
                    <Card
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Paginator
                            currentPage={currentPage}
                            onPageChanged={onPageChanged}
                            totalItemsCount={totalUsersCount}
                            pageSize={pageSize}
                            portionSize={10}
                        />
                    </Card>
                </Grid>
                <Grid item xs={10} md={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            rowGap={1}
                            columnGap={1}
                        >
                            {users.map((user) => (
                                <Grid item xs={10} md={5} key={user.id}>
                                    <Card
                                        sx={{
                                            height: "210px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <User
                                            key={user.id}
                                            user={user}
                                            followingInProgress={
                                                followingInProgress
                                            }
                                            followThunkCreator={follow}
                                            unfollowThunkCreator={unfollow}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
