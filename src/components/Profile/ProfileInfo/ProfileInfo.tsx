import { ChangeEvent, FC, useState } from "react";
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import userPhoto from "../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import ProfileData from "./ProfileData/ProfileData";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";
import { ProfileType } from "../../../types/types";
import { SaveProfileThunkType } from "../../../store/profile-reducer";
import { Stack, IconButton, Grid, Box } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import style from "./ProfileInfo.module.css";

export type PropsTypes = {
    profile: ProfileType | null;
    isOwner: boolean;
    saveMainPhoto: (file: File) => void;
    // saveProfile: (profile: ProfileType) => Promise<{errorLog: string, hasError: boolean, type: string} | undefined>
    saveProfile: (profile: ProfileType) => Promise<SaveProfileThunkType>;
    hasError: boolean;
    errorLog: string;
    status: string;
    updateStatus: (status: string) => void;
};

const ProfileInfo: FC<PropsTypes> = ({
    profile,
    isOwner,
    saveMainPhoto,
    saveProfile,
    hasError,
    errorLog,
    ...props
}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const setMainPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            saveMainPhoto(e.target.files[0]);
        }
    };

    const changeEditModeToggle = () => {
        setEditMode(true);
    };

    const handleSubmit = async (formData: ProfileType) => {
        const result = await saveProfile(formData);
        if (result === undefined) {
            setEditMode(false);
        }
    };

    return (
        <div className={style.descriptionBlock}>
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1}>
                    <Grid item xs={12} sm={3} lg={2}>
                        <img src={profile.photos.large || userPhoto} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={10} className={style.profileInfo}>
                        {editMode ? (
                            <>
                                {isOwner && (
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="label"
                                        >
                                            <input
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                onChange={setMainPhoto}
                                            />
                                            <PhotoCamera />
                                        </IconButton>{" "}
                                        Change Photo
                                    </Stack>
                                )}
                                <ProfileDataForm
                                    profile={profile}
                                    handleSubmit={handleSubmit}
                                    initialValue={profile}
                                    hasError={hasError}
                                    errorLog={errorLog}
                                />
                            </>
                        ) : (
                            <ProfileData
                                profile={profile}
                                isOwner={isOwner}
                                changeEditMode={changeEditModeToggle}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <ProfileStatus
                            status={props.status}
                            updateStatus={props.updateStatus}
                        />
                    </Grid>
                </Grid>
            </Box>

            <div></div>
        </div>
    );
};

export default ProfileInfo;
