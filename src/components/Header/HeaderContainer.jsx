import Header from "./Header";
import { useEffect } from "react";
import { connect } from "react-redux";
import { AuthUserDataThunkCreator } from "../../redux/auth-reducer";

const HeaderContainer = (props) => {
    useEffect(() => {
        // use Thunk
        props.AuthUserDataThunkCreator();

        // use DAL (data access layer) for api requests
        // profileAPI.getAuth().then((data) => {
        //     if (data.resultCode === 0) {
        //         const { id, email, login } = data.data;
        //         props.setAuthUserData(id, email, login);
        //     }
        // });
    }, []);

    return <Header {...props} />;
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {
    AuthUserDataThunkCreator,
})(HeaderContainer);
