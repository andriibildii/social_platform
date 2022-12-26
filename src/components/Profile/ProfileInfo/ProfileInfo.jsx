import style from "./ProfileInfo.module.css";
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    const { profile } = props;
    if (!profile) {
        return <Preloader />;
    }
    return (
        <>
            <div>
                <img
                    src="https://images.rawpixel.com/image_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MjA4MzY2MS13aWtpbWVkaWEtaW1hZ2Utam9iNTcyLTEuanBn.jpg"
                    alt="main banner"
                ></img>
            </div>
            <div className={style.descriptionBlock}>
                <img src={profile.photos.large} />
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                <div>
                    <span>{profile.fullName}</span>
                </div>
                <div>
                    <span>{profile.aboutMe}</span>
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;
