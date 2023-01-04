import userPhoto from "../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import style from "./UserItem.module.css";
import { NavLink } from "react-router-dom";

const UserItem = ({
    currentPage,
    onPageChanged,
    users,
    totalUsersCount,
    pageSize,
    followingInProgress,
    unfollowThunkCreator,
    followThunkCreator,
}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((page, index) => (
                    <span
                        key={index}
                        className={currentPage === page ? style.selectedPage : ''}
                        onClick={() => {
                            onPageChanged(page);
                        }}
                    >
                        {page}
                    </span>
                ))}
            </div>
            {users.map((user) => (
                <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                                <img
                                    src={
                                        user.photos.small !== null
                                            ? user.photos.small
                                            : userPhoto
                                    }
                                    className={style.userImage}
                                />
                            </NavLink>
                        </div>
                        <div>
                            {user.followed ? (
                                <button
                                    disabled={followingInProgress.some(
                                        (id) => id === user.id
                                    )}
                                    onClick={() => {
                                        unfollowThunkCreator(user.id);
                                    }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    disabled={followingInProgress.some(
                                        (id) => id === user.id
                                    )}
                                    onClick={() => {
                                        followThunkCreator(user.id);
                                    }}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        {/*<span>*/}
                        {/*    <div>{user.location.city}</div>*/}
                        {/*    <div>{user.location.country}</div>*/}
                        {/*</span>*/}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default UserItem;
