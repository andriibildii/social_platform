import { FC } from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import userPhoto from "../../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import style from "./User.module.css";
import { UsersType } from "../../../../types/types";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

type PropsType = {
    user: UsersType;
    followingInProgress: Array<number>;
    followThunkCreator: (userId: number) => void;
    unfollowThunkCreator: (userId: number) => void;
};

const User: FC<PropsType> = ({
    user,
    followingInProgress,
    followThunkCreator,
    unfollowThunkCreator,
}) => {
    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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
                        <Button
                            disabled={followingInProgress.some(
                                (id) => id === user.id
                            )}
                            onClick={() => {
                                unfollowThunkCreator(user.id);
                            }}
                            variant="outlined"
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            disabled={followingInProgress.some(
                                (id) => id === user.id
                            )}
                            onClick={() => {
                                followThunkCreator(user.id);
                            }}
                            variant="outlined"
                        >
                            Follow
                        </Button>
                    )}
                </div>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </Box>
        </div>
    );
};

export default User;
