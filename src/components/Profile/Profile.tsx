import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { MyPosts } from "./MyPosts/MyPosts";
import {
    saveMainPhotoThunkCreator,
    saveProfileThunkCreator,
    updateStatusThunkCreator,
} from "../../redux/profile-reducer";
import {
    getError,
    getErrorLog,
    getProfile,
    getStatus,
} from "../../redux/profile-selectors";
import { ProfileType } from "../../types/types";
import { AppDispatch } from "../../redux/store";
import { Grid, Card, Box } from "@mui/material";

type PropsTypes = {
    isOwner: boolean;
};

const Profile: React.FC<PropsTypes> = React.memo(({ isOwner }) => {
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
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columnSpacing={1}
                    rowSpacing={1}
                >
                    <Grid item xs={10} xl={12}>
                        <Card>
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
                        </Card>
                    </Grid>
                    <Grid item xs={10} xl={12}>
                        <Card>
                            <MyPosts />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
});

export default Profile;
