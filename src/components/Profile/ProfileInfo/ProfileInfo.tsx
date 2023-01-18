import { ChangeEvent, FC, useState } from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
// @ts-ignore
import userPhoto from "../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import { ContactsType, PhotosType, ProfileType } from "../../../types/types";

export type PropsTypes = {
    profile: ProfileType | null
    isOwner: boolean
    saveMainPhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<{errorLog: string, hasError: boolean, type: string} | undefined>
    // saveProfile: (profile: ProfileType) => Promise<any>
    hasError: boolean,
    errorLog: string,
    status: string
    updateStatus: (status: string) => void
}

// export type FormDataType = {
//     aboutMe: string
//     contacts: ContactsType
//     fullName: string
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     photos: PhotosType
//     userId: number
// }

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
        console.log("formData", formData)

        saveProfile(formData).then((value) => {
            console.log("value", value)
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
