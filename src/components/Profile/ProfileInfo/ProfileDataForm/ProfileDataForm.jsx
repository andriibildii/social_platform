import { Field, Form } from "react-final-form";
import {
    Input,
    TextArea,
} from "../../../../common/FormsControls/FormsControls";
import styles from "../../../Login/LoginForm/LoginForm.module.css";

const ProfileDataForm = ({
    profile,
    handleSubmit,
    initialValues,
    hasError,
    errorLog,
}) => {
    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <button>save</button>
                    </div>
                    {hasError && errorLog && (
                        <div className={styles.error}>{errorLog}</div>
                    )}
                    <div>
                        <b>Full name:</b>
                        <Field
                            placeholder="Full name"
                            name="fullName"
                            component={Input}
                        />
                    </div>
                    <div>
                        <b>Looking for a job: </b>
                        <Field
                            placeholder=""
                            name="lookingForAJob"
                            component={Input}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <b>My professional skills: </b>
                        <Field
                            placeholder="My professional skills"
                            name="lookingForAJobDescription"
                            component={TextArea}
                        />
                    </div>
                    <div>
                        <b>About me: </b>
                        <Field
                            placeholder="About me"
                            name="aboutMe"
                            component={TextArea}
                        />
                    </div>
                    <div>
                        <b>Contacts:</b>{" "}
                        {Object.keys(profile.contacts).map((key) => {
                            return (
                                <div className={styles.contact} key={key}>
                                    <b>{key}: </b>{" "}
                                    <Field
                                        placeholder={key}
                                        name={"contacts." + key}
                                        component={Input}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
        />
    );
};

export default ProfileDataForm;
