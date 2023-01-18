import { FC } from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import userPhoto from "../../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import style from "./User.module.css";
import { UsersType } from "../../../../types/types";

type PropsType = {
  user: UsersType
  followingInProgress: Array<number>
  followThunkCreator: (userId: number) => void
  unfollowThunkCreator: (userId: number) => void
}

const User: FC<PropsType> = ({ user, followingInProgress, followThunkCreator, unfollowThunkCreator }) => {
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
