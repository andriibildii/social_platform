import style from "./ProfileInfo.module.css";
import Preloader from "../../../common/preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
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
                <img src={props.profile.photos.large} />
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
            </div>
        </>
    );
};

export default ProfileInfo;
