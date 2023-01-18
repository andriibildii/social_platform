import { FC } from "react";
import { Form, Field } from "react-final-form";
import { maxValue } from "../../../utils/validators";
import { TextArea } from "../../../common/FormsControls/FormsControls";
import { FormDataType } from "../Dialogs";

type PropsType = {
  onSubmit: (formData: FormDataType) => void
}

const AddMessageForm: FC<PropsType> = ({ onSubmit }) => {
    // const composeValidators =
    //     (...validators) =>
    //     (value: string) =>
    //         validators.reduce(
    //             (error, validator) => error || validator(value),
    //             undefined
    //         );

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
                            validate={maxValue(5)}
                        />
                    </div>
                    <div>
                        <button>Send Message</button>
                    </div>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                </form>
            )}
        />
    );
};

export default AddMessageForm;
