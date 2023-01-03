import { Form, Field } from "react-final-form";
import { Input } from "../../../common/FormsControls/FormsControls";
import { required } from "../../../utils/validators";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onSubmit }) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, values, submitError }) => (

                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="email"
                            component={Input}
                            type="text"
                            placeholder="email"
                            validate={required}
                        />
                    </div>
                    <div>
                        <Field
                            name="password"
                            component={Input}
                            type="password"
                            placeholder="password"
                            validate={required}
                        />
                    </div>
                    <div>
                        <Field
                            name="rememberMe"
                            component={Input}
                            type="checkbox"
                        />
                    </div>
                    {submitError && (
                        <div className={styles.error}>{submitError}</div>
                    )}
                    <div>
                        <button>Login</button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
        />
    );
};

export default LoginForm;
