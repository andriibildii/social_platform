import { useEffect, FC } from "react";
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
import { AppStateType } from "../../redux/store";
import { ProfileType } from "../../types/types";

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    hasError: boolean,
    errorLog: string,
}

type MapDispatchToPropsType = {
    profileThunkCreator: (userId: number | null) => void
    getStatusThunkCreator: (userId: number | null) => void
    updateStatusThunkCreator: (status: string) => void
    saveMainPhotoThunkCreator: (file: any) => void
    saveProfileThunkCreator: (profile: ProfileType) => void
}

type OwnPropsType = {
    router: {
        params: {
            userId: number | null
        }
    }
}
type PropsTypes = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const ProfileContainer: FC<PropsTypes> = ({
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
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthUserId(state),
    isAuth: getAuthInfo(state),
    hasError: getError(state),
    errorLog: getErrorLog(state),
});

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        profileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        saveMainPhotoThunkCreator,
        saveProfileThunkCreator,
    }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);
