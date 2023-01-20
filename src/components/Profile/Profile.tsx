import React from "react";
import MyPostsContainerConnect from "./MyPosts/MyPostsContainerConnect";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// import style from "./Profile.module.css";
import Card from "@mui/material/Paper";
import { ProfileType } from "../../types/types";
import {
    getError,
    getErrorLog,
    getProfile,
    getStatus,
} from "../../redux/profile-selectors";
import { useDispatch, useSelector } from "react-redux";
import {
    saveMainPhotoThunkCreator,
    saveProfileThunkCreator,
    updateStatusThunkCreator,
} from "../../redux/profile-reducer";
import { AppDispatch } from "../../redux/store";

type PropsTypes = {
    isOwner: boolean;
};

const Profile: React.FC<PropsTypes> = React.memo(({ isOwner }) => {
    // console.log("RENDER PROFILE");

    const profile = useSelector(getProfile);
    const status = useSelector(getStatus);
    const hasError = useSelector(getError);
    const errorLog = useSelector(getErrorLog);
    const dispatch: AppDispatch = useDispatch();

    const updateStatus = (status: string) => {
        dispatch(updateStatusThunkCreator(status));
    };

    const savePhoto = (file: any) => {
        dispatch(saveMainPhotoThunkCreator(file));
    };

    const saveProfile = async (profile: ProfileType) => {
        const promiseResult = await dispatch(saveProfileThunkCreator(profile));
        return promiseResult;
    };

    return (
        <div className="">
            <Card sx={{ minHeight: 796 }}>
                <ProfileInfo
                    isOwner={isOwner}
                    profile={profile}
                    status={status}
                    updateStatus={updateStatus}
                    saveMainPhoto={savePhoto}
                    saveProfile={saveProfile}
                    hasError={hasError}
                    errorLog={errorLog}
                />
                <MyPostsContainerConnect />
            </Card>
        </div>
    );
});

export default Profile;
