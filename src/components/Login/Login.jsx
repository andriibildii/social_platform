import LoginForm from "./LoginForm/LoginForm";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";

const Login = ({
    loginThunkCreator,
    isAuth,
    hasError,
    errorLog,
    captchaUrl,
}) => {
    const navigate = useNavigate();

    // w_GAZtd5Wxn!4Vs

    const onSubmit = (formData) => {
        loginThunkCreator(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        );
    };

    if (isAuth) {
        return navigate("/profile");
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm
                onSubmit={onSubmit}
                hasError={hasError}
                errorLog={errorLog}
                captchaUrl={captchaUrl}
            />
        </div>
    );
};

const mapStateTOProps = (state) => ({
    isAuth: state.auth.isAuth,
    hasError: state.auth.hasError,
    errorLog: state.auth.errorLog,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateTOProps, { loginThunkCreator })(Login);
