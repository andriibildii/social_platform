import { ChangeEvent, FC, useEffect, useState } from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
// @ts-ignore
import userPhoto from "../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import { ContactsType, PhotosType, ProfileType } from "../../../types/types";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { saveProfileThunkCreator } from "../../../redux/profile-reducer";
import { getError } from "../../../redux/profile-selectors";

export type PropsTypes = {
    profile: ProfileType | null;
    isOwner: boolean;
    saveMainPhoto: (file: any) => void;
    // saveProfile: (profile: ProfileType) => Promise<{errorLog: string, hasError: boolean, type: string} | undefined>
    saveProfile: (profile: ProfileType) => Promise<any>
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


    const handleSubmit = (formData: ProfileType) => {
         saveProfile(formData).then((value) => {
            if (value === undefined) {
                setEditMode(false);
            }
        });
    };

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} />
                {isOwner && <input type={"file"} onChange={setMainPhoto} />}

                {editMode ? (
                    <ProfileDataForm
                        profile={profile}
                        handleSubmit={handleSubmit}
                        initialValues={profile}
                        hasError={hasError}
                        errorLog={errorLog}
                    />
                ) : (
                    <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        changeEditMode={changeEditModeToggle}
                    />
                )}
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
        </div>
    );
};

export default ProfileInfo;
