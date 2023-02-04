import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { ProfileType } from "../../../../types/types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { TextField, CheckboxWithLabel } from "formik-mui";
import styles from "../../../Login/LoginForm/LoginForm.module.css";

type PropsTypes = {
    profile: ProfileType;
    handleSubmit: (formData: ProfileType) => void;
    initialValue: ProfileType;
    hasError: boolean;
    errorLog: string;
};

export const ProfileDataForm: FC<PropsTypes> = ({
    profile,
    handleSubmit,
    initialValue,
    hasError,
    errorLog,
}) => {
    return (
        <>
            <Formik
                initialValues={initialValue}
                onSubmit={(
                    values: ProfileType,
                    { setSubmitting }: FormikHelpers<ProfileType>
                ) => {
                    handleSubmit(values);
                    setSubmitting(false);
                }}
            >
                <Form>
                    <Stack
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            save
                        </Button>
                        {hasError && errorLog && (
                            <Alert severity="error" style={{ width: "94%" }}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{errorLog}</strong>
                            </Alert>
                        )}
                        <Field
                            component={TextField}
                            id="fullName"
                            name="fullName"
                            label="Full name"
                            type="text"
                        />
                        <Field
                            component={TextField}
                            id="lookingForAJobDescription"
                            name="lookingForAJobDescription"
                            label="My professional skills"
                            type="text"
                        />
                        <Field
                            component={TextField}
                            id="aboutMe"
                            name="aboutMe"
                            label="About me"
                            type="text"
                        />
                        <Field
                            component={CheckboxWithLabel}
                            type="checkbox"
                            id="lookingForAJob"
                            name="lookingForAJob"
                            Label={{ label: "Looking for a job?" }}
                        />
                    </Stack>
                    <div>
                        <b>Contacts:</b>{" "}
                        {Object.keys(profile.contacts).map((key) => {
                            return (
                                <div className={styles.contact} key={key}>
                                    <Field
                                        placeholder={key}
                                        name={"contacts." + key}
                                        label={key}
                                        component={TextField}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </Form>
            </Formik>
        </>
    );
};
