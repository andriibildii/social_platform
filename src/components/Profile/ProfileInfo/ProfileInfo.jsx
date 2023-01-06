import style from "./ProfileInfo.module.css";
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = ({ profile, ...props }) => {
    if (!profile) {
        return <Preloader />;
    }
    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={profile.photos.large} />
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
                <div>
                    <span>{profile.fullName}</span>
                </div>
                <div>
                    <span>{profile.aboutMe}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
