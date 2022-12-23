import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
    function RedirectComponent(props) {
        debugger
        const navigate = useNavigate();
        const { isAuth } = props;
        console.log(isAuth);

        useEffect(() => {
            // if (props.isAuth === false) {
            //     return navigate("/login");
            // }
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
