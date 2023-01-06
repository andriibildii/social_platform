import Header from "./Header";
import { useEffect } from "react";
import { connect } from "react-redux";
import { logoutThunkCreator } from "../../redux/auth-reducer";

const HeaderContainer = (props) => {
    // useEffect(() => {
    //     props.authUserDataThunkCreator();
    // }, []);

    return <Header {...props} />;
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { logoutThunkCreator })(
    HeaderContainer
);
