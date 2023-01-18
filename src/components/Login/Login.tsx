import { ComponentType, FC } from "react";
import LoginForm from "./LoginForm/LoginForm";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import styles from "./LoginForm/LoginForm.module.css";
import { AppStateType } from "../../redux/store";
import { compose } from "redux";

type MapStatePropsType = {
    isAuth: boolean;
    hasError: boolean;
    errorLog: string | null;
    captchaUrl: string | null;
};

type MapDispatchPropsType = {
    loginThunkCreator: (
        email: string,
        password: string,
        rememberMe: boolean,
        captcha: string
    ) => void;
};

export type LoginFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

type PropsTypes = MapStatePropsType & MapDispatchPropsType;

// @ts-ignore
const Login: FC<PropsTypes> = ({
    loginThunkCreator,
    isAuth,
    hasError,
    errorLog,
    captchaUrl,
}) => {
    const navigate = useNavigate();

    // w_GAZtd5Wxn!4Vs

    const onSubmit = (formData: LoginFormType) => {
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

const mapStateTOProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    hasError: state.auth.hasError,
    errorLog: state.auth.errorLog,
    captchaUrl: state.auth.captchaUrl,
});

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, undefined, AppStateType>(
        mapStateTOProps,
        { loginThunkCreator }
    )
)(Login);
