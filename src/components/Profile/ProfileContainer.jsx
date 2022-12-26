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

const ProfileContainer = (props) => {
    let userId = props.router.params.userId;
    if (!userId) {
        userId = 27205;
    }

    useEffect(() => {
        // use Thunk
        props.profileThunkCreator(userId);
        props.getStatusThunkCreator(userId);
    }, []);

    return (
        <Profile
            {...props}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatusThunkCreator}
        />
    );
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
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

/// VERSION WITHOUT COMPOSE
// const AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// const WithUrlDataProfileComponent = withRouter(AuthRedirectComponent);
//
// export default connect(mapStateToProps, { profileThunkCreator })(
//     WithUrlDataProfileComponent
// );
