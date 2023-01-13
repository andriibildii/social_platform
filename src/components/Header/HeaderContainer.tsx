import { FC, useEffect } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutThunkCreator } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/store";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToPropsType = {
    logoutThunkCreator: () => void
}

type PropsTypes = MapStateToPropsType & MapDispatchToPropsType;

const HeaderContainer: FC<PropsTypes> = (props) => {
    // useEffect(() => {
    //     props.authUserDataThunkCreator();
    // }, []);

    return <Header {...props} />;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, undefined, AppStateType >(mapStateToProps, { logoutThunkCreator })(
    HeaderContainer
);
