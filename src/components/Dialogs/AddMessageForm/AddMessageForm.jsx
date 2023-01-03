import { Form, Field } from "react-final-form";
import { maxValue, required } from "../../../utils/validators";
import { TextArea } from "../../../common/FormsControls/FormsControls";

const AddMessageForm = ({ onSubmit }) => {
    const composeValidators =
        (...validators) =>
        (value) =>
            validators.reduce(
                (error, validator) => error || validator(value),
                undefined
            );

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="newMessage"
                            component={TextArea}
                            placeholder="add new message..."
                            type="text"
                            validate={composeValidators(required, maxValue(5))}
                        />
                    </div>
                    <div>
                        <button>Send Message</button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
        />
    );
};

export default AddMessageForm;
