import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import {
    profileThunkCreator,
    getStatusThunkCreator,
} from "../../redux/profile-reducer";
import {
    getAuthInfo,
    getAuthUserId,
} from "../../redux/profile-selectors";
import { AppDispatch } from "../../redux/store";

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
        dispatch(getStatusThunkCreator(userId))
    }

    const getProfile = (userId: number | null) => {
        dispatch(profileThunkCreator(userId))
    }

    // ?????????????????????????????????????
    useEffect(() => {
        setAuthorizedUser();
        if (!userId && !authorizedUserId) {
            navigate("/login");
        }
    }, [authorizedUserId, userId]);

    // auth redirect
    useEffect(() => {
        !isAuth && navigate("/login");
    }, [isAuth]);


    useEffect(() => {
        // use Thunk
        getProfile(userId);
        getStatus(userId);
    }, [userId]);

    return (
        <Profile
            isOwner={!userId}
        />
    );
};

export default ProfileContainer;


//     withRouter,
//     withAuthRedirect