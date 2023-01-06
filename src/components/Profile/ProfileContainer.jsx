import { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
    profileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
} from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";
import { useNavigate } from "react-router-dom";
import {
    getAuthInfo,
    getAuthUserId,
    getProfile,
    getStatus,
} from "../../redux/profile-selectors";

const ProfileContainer = ({
    profile,
    status,
    profileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    ...props
}) => {
    const navigate = useNavigate();
    const authorizedUserId = props.authorizedUserId;
    let userId = props.router.params.userId;
    if (!userId) {
        userId = authorizedUserId;
    }

    useEffect(() => {
        if (!userId && !authorizedUserId) {
            navigate("/login");
        }
    }, [userId, authorizedUserId]);

    useEffect(() => {
        // use Thunk
        profileThunkCreator(userId);
        getStatusThunkCreator(userId);
    }, [profileThunkCreator, getStatusThunkCreator]);

    return (
        <Profile
            {...props}
            profile={profile}
            status={status}
            updateStatus={updateStatusThunkCreator}
        />
    );
};

// const mapStateToProps = (state) => ({
//     profile: state.profilePage.profile,
//     status: state.profilePage.status,
//     authorizedUserId: state.auth.userId,
//     isAuth: state.auth.isAuth,
// });

const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthUserId(state),
    isAuth: getAuthInfo(state),
});

export default compose(
    connect(mapStateToProps, {
        profileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
    }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);
