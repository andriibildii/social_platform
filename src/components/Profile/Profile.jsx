import MyPostsContainerConnect from "./MyPosts/MyPostsContainerConnect";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import style from "./Profile.module.css";

const Profile = (props) => {
    return (
        <div className="">
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainerConnect />
        </div>
    );
};

export default Profile;
