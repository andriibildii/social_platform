import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppStateType } from "../../store/store";
import { LoginForm } from "./LoginForm/LoginForm";
import { Container } from "@mui/material";
import styles from "./LoginForm/LoginForm.module.css";

export const Login: FC = () => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    useEffect(() => {
        isAuth && navigate("/profile");
    }, [isAuth]);

    return (
        <Container>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <LoginForm />
            </div>
        </Container>
    );
};
