import style from "./ProfileInfo.module.css";
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import userPhoto from "../../../assets/img/image-from-rawpixel-id-6642555-png.png";
import { useState } from "react";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = ({
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

    const setMainPhoto = (e) => {
        if (e.target.files.length) {
            saveMainPhoto(e.target.files[0]);
        }
    };

    const changeEditModeToggle = () => {
        setEditMode(true);
    };

    const handleSubmit = (formData) => {
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
