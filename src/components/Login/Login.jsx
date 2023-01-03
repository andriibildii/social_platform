import LoginForm from "./LoginForm/LoginForm";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR } from "final-form";

const Login = (props) => {
    const navigate = useNavigate();
    const { hasError, errorLog } = props;

    // w_GAZtd5Wxn!4Vs

    const onSubmit = (formData) => {
        props.loginThunkCreator(
            formData.email,
            formData.password,
            formData.rememberMe
        );

        if (hasError && errorLog) {
            return { [FORM_ERROR]: errorLog };
        }
    };

    if (props.isAuth) {
        return navigate("/profile");
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} hasError={hasError} />
        </div>
    );
};

const mapStateTOProps = (state) => ({
    isAuth: state.auth.isAuth,
    hasError: state.auth.hasError,
    errorLog: state.auth.errorLog,
});

export default connect(mapStateTOProps, { loginThunkCreator })(Login);
