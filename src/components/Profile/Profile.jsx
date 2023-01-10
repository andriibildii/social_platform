import React from "react";
import MyPostsContainerConnect from "./MyPosts/MyPostsContainerConnect";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import style from "./Profile.module.css";

const Profile = React.memo(({ ...props }) => {
    // console.log("RENDER PROFILE");

    return (
        <div className="">
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveMainPhoto={props.saveMainPhoto}
                saveProfile={props.saveProfile}
                hasError={props.hasError}
                errorLog={props.errorLog}
            />
            <MyPostsContainerConnect />
        </div>
    );
});

export default Profile;
