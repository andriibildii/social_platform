import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../../store/store";
import { loginThunkCreator } from "../../../store/auth-reducer";
import * as yup from "yup";
import { Button, TextField, AlertTitle, Box, Alert, Checkbox, FormControlLabel, Stack } from "@mui/material";
import styles from './LoginForm.module.css'

type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean(),
    captcha: yup.string(),
});

export const LoginForm = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const hasError = useSelector((state: AppStateType) => state.auth.hasError);
    const errorLog = useSelector((state: AppStateType) => state.auth.errorLog);
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (values: LoginFormType) => {
        dispatch(
            loginThunkCreator(
                values.email,
                values.password,
                values.rememberMe,
                values.captcha
            )
        );
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <Box sx={{ width: '50%'}} >
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <FormControlLabel
                        id="rememberMe"
                        name="rememberMe"
                        onChange={formik.handleChange}
                        control={<Checkbox />}
                        label="Remember me"
                    />

                    {hasError && captchaUrl && (
                        <img src={captchaUrl} alt={"captchaUrl"} className={styles.captchaImage}/>
                    )}
                    {hasError && captchaUrl && (
                        <div>
                            <TextField
                                id="captcha"
                                name="captcha"
                                placeholder="Symbols from image"
                                type="captcha"
                                onChange={formik.handleChange}
                            />
                        </div>
                    )}
                    {hasError && errorLog && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>{errorLog}</strong>
                        </Alert>
                    )}
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};
