import React from "react";
import MyPostsContainerConnect from "./MyPosts/MyPostsContainerConnect";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// import style from "./Profile.module.css";
import Card from "@mui/material/Paper";
import { ProfileType } from "../../types/types";

type PropsTypes = {
    isOwner: boolean;
    profile: ProfileType | null;
    status: string;
    updateStatus: (status: string) => void;
    saveMainPhoto: (file: any) => void;
    saveProfile: (profile: ProfileType) => void;
    hasError: boolean;
    errorLog: string;
};

const Profile: React.FC<PropsTypes> = React.memo(({ ...props }) => {
    // console.log("RENDER PROFILE");


    return (
        <div className="">
            <Card sx={{ minHeight: 796 }}>
                <ProfileInfo
                    isOwner={props.isOwner}
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    saveMainPhoto={props.saveMainPhoto}
                    // @ts-ignore
                    saveProfile={props.saveProfile}
                    hasError={props.hasError}
                    errorLog={props.errorLog}
                />
                <MyPostsContainerConnect />
            </Card>
        </div>
    );
});

export default Profile;
