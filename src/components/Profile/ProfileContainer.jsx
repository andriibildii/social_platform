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

const ProfileContainer = ({profile, status, profileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator,  ...props}) => {

    let userId = props.router.params.userId;
    if (!userId) {
        userId = props.authorizedUserId;
    }

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

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
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