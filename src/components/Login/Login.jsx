import LoginForm from "./LoginForm/LoginForm";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import styles from "./LoginForm/LoginForm.module.css";

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
      <Card sx={{ minHeight: 796 }}>
        <div className={styles.formContainer}>
            <h1>Login</h1>
            <LoginForm
                onSubmit={onSubmit}
                hasError={hasError}
                errorLog={errorLog}
                captchaUrl={captchaUrl}
            />
        </div>
      </Card>
    );
};

const mapStateTOProps = (state) => ({
    isAuth: state.auth.isAuth,
    hasError: state.auth.hasError,
    errorLog: state.auth.errorLog,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateTOProps, { loginThunkCreator })(Login);
