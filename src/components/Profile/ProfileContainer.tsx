import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import Profile from "./Profile";
import {
    profileThunkCreator,
    getStatusThunkCreator,
} from "../../store/profile-reducer";
import { getAuthInfo, getAuthUserId } from "../../store/profile-selectors";

const ProfileContainer: FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const isAuth = useSelector(getAuthInfo);
    const authorizedUserId = useSelector(getAuthUserId);

    const dispatch: AppDispatch = useDispatch();

    let userId: number | null = Number(params.userId);

    const setAuthorizedUser = () => {
        if (!userId) {
            userId = authorizedUserId;
        }
    };

    const getStatus = (userId: number | null) => {
        dispatch(getStatusThunkCreator(userId));
    };
    const getProfile = (userId: number | null) => {
        dispatch(profileThunkCreator(userId));
    };

    useEffect(() => {
        setAuthorizedUser();
        if (!userId && !authorizedUserId) {
            navigate("/login");
        }
    }, [authorizedUserId, userId]);

    useEffect(() => {
        !isAuth && navigate("/login");
    }, [isAuth]);

    useEffect(() => {
        // use Thunk
        getProfile(userId);
        getStatus(userId);
    }, [userId]);

    return <Profile isOwner={!userId} />;
};

export default ProfileContainer;
