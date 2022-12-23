import { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { profileThunkCreator } from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";

const ProfileContainer = (props) => {
    let userId = props.router.params.userId;
    if (!userId) {
        userId = 2;
    }

    useEffect(() => {
        // use Thunk
        props.profileThunkCreator(userId);
    }, []);

    return <Profile {...props} profile={props.profile} />;
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default compose(
    connect(mapStateToProps, { profileThunkCreator }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

/// VERSION WITHOUT COMPOSE
// const AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// const WithUrlDataProfileComponent = withRouter(AuthRedirectComponent);
//
// export default connect(mapStateToProps, { profileThunkCreator })(
//     WithUrlDataProfileComponent
// );
