import { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
    profileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    saveMainPhotoThunkCreator,
    saveProfileThunkCreator,
} from "../../redux/profile-reducer";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";
import { useNavigate } from "react-router-dom";
import {
    getAuthInfo,
    getAuthUserId,
    getProfile,
    getStatus,
    getError,
    getErrorLog,
} from "../../redux/profile-selectors";

const ProfileContainer = ({
    profile,
    status,
    profileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    saveMainPhotoThunkCreator,
    saveProfileThunkCreator,
    hasError,
    errorLog,
    ...props
}) => {
    const navigate = useNavigate();
    const authorizedUserId = props.authorizedUserId;
    let { userId } = props.router.params;

    const setAuthorizedUser = () => {
        if (!userId) {
            userId = authorizedUserId;
        }
    };

    // ?????????????????????????????????????

    useEffect(() => {
        setAuthorizedUser();

        if (!userId && !authorizedUserId) {
            navigate("/login");
        }
    }, [userId, authorizedUserId]);

    useEffect(() => {
        // use Thunk
        profileThunkCreator(userId);
        getStatusThunkCreator(userId);
    }, [userId]);

    return (
        <Profile
            {...props}
            isOwner={!userId}
            profile={profile}
            status={status}
            updateStatus={updateStatusThunkCreator}
            saveMainPhoto={saveMainPhotoThunkCreator}
            saveProfile={saveProfileThunkCreator}
            hasError={hasError}
            errorLog={errorLog}
        />
    );
};

// mapStateToProps with selectors
const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthUserId(state),
    isAuth: getAuthInfo(state),
    hasError: getError(state),
    errorLog: getErrorLog(state),
});

export default compose(
    connect(mapStateToProps, {
        profileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        saveMainPhotoThunkCreator,
        saveProfileThunkCreator,
    }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);
