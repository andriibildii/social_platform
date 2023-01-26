// import { Field, Form } from "react-final-form";
import {
    Input,
    TextArea,
} from "../../../../common/FormsControls/FormsControls";
import styles from "../../../Login/LoginForm/LoginForm.module.css";
import { ContactsType, PhotosType, ProfileType } from "../../../../types/types";
import { FC } from "react";
// import { Formik, FormikHelpers } from "formik";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import { Formik, Field, Form, FormikHelpers } from "formik";
import { TextField, CheckboxWithLabel } from "formik-mui";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import * as Yup from "yup";

type PropsTypes = {
    profile: ProfileType;
    handleSubmit: (formData: ProfileType) => void;
    initialValue: ProfileType;
    hasError: boolean;
    errorLog: string;
};



export const ProfileDataFormFormik: FC<PropsTypes> = ({
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
                // validationSchema={DisplayingErrorPostsSchema}
                onSubmit={(
                    values: ProfileType,
                    { setSubmitting }: FormikHelpers<ProfileType>
                ) => {
                    console.log(values);
                    handleSubmit(values)
                    setSubmitting(false);
                }}
            >
                <Form>
                    <Stack
                        direction="column"
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
                          <Alert severity="error">
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
