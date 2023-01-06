import Paginator from "../../../common/Paginator/Paginator";
import style from "./UserItem.module.css";
import User from "./User/User";

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
        <div>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
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
    );
};

export default UsersItems;
