import Paginator from "../../../common/Paginator/Paginator";
import User from "./User/User";
import Card from "@mui/material/Card";

const UsersItems = ({
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
