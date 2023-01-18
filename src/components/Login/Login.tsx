import { FC, useEffect } from "react";
import LoginForm from "./LoginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import styles from "./LoginForm/LoginForm.module.css";
import { AppDispatch, AppStateType } from "../../redux/store";

export type LoginFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

export const Login: FC = () => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const hasError = useSelector((state: AppStateType) => state.auth.hasError);
    const errorLog = useSelector((state: AppStateType) => state.auth.errorLog);
    const captchaUrl = useSelector(
        (state: AppStateType) => state.auth.captchaUrl
    );
    const dispatch: AppDispatch = useDispatch();

    // w_GAZtd5Wxn!4Vs

    const onSubmit = (formData: LoginFormType) => {
        dispatch(
            loginThunkCreator(
                formData.email,
                formData.password,
                formData.rememberMe,
                formData.captcha
            )
        );
    };

    useEffect(() => {
        isAuth && navigate("/profile");
    }, [isAuth]);

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
