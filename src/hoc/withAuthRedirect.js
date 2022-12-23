import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
    function RedirectComponent(props) {
        const navigate = useNavigate();
        const { isAuth } = props;

        useEffect(() => {
            !isAuth && navigate("/login");
        }, [isAuth]);

        return <Component {...props} />;
    }

    const mapStateToPropsForRedirect = (state) => {
        return {
            isAuth: state.auth.isAuth,
        };
    };

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
        RedirectComponent
    );

    return ConnectedAuthRedirectComponent;
};
