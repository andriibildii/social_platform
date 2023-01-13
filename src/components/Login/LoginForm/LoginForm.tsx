import { FC } from "react";
import { Form, Field } from "react-final-form";
import { Input } from "../../../common/FormsControls/FormsControls";
import { required } from "../../../utils/validators";
import {LoginFormType} from "../Login";
import styles from "./LoginForm.module.css";

type PropsTypes = {
  onSubmit: (formData: LoginFormType) => void
  hasError: boolean
  errorLog: string | null
  captchaUrl: string | null
}

const LoginForm: FC<PropsTypes> = ({ onSubmit, hasError, errorLog, captchaUrl }) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, values }) => (
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
                    {captchaUrl && <img src={captchaUrl} alt={'captchaUrl'}/>}
                    {captchaUrl && (
                        <div>
                            <Field
                                name="captcha"
                                placeholder="Symbols from image"
                                component={Input}
                                type="captcha"
                                validate={required}
                            />
                        </div>
                    )}
                    {hasError && errorLog && (
                        <div className={styles.error}>{errorLog}</div>
                    )}
                    <div>
                        <button>Login</button>
                    </div>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                </form>
            )}
        />
    );
};

export default LoginForm;
