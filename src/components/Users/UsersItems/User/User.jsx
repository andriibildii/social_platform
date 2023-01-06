import { NavLink } from "react-router-dom";
import userPhoto from "../../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import style from "./User.module.css";

const User = ({ user, followingInProgress, followThunkCreator, unfollowThunkCreator }) => {
    return (
        <div>
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
            </span>
        </div>
    );
};

export default User;
