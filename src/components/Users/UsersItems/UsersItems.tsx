import { FC } from "react";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User/User";
import Card from "@mui/material/Card";
import { UsersType } from "../../../types/types";

type PropsType = {
    currentPage: number
    onPageChanged: (page: number) => void
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    followingInProgress: Array<number>
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
}

const UsersItems: FC<PropsType> = ({
    currentPage,
    onPageChanged,
    users,
    totalUsersCount,
    pageSize,
    followingInProgress,
    unfollowThunkCreator,
    followThunkCreator,
}) => {
    return (
        <Card sx={{ minHeight: 796 }}>
            <div>
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
                            followThunkCreator={followThunkCreator}
                            unfollowThunkCreator={unfollowThunkCreator}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default UsersItems;
