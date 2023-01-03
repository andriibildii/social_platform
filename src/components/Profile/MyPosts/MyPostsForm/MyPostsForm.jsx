import { Form, Field } from "react-final-form";
import { required, maxValue } from "../../../../utils/validators";
import { TextArea } from "../../../../common/FormsControls/FormsControls";

const AddPostForm = ({ onSubmit }) => {
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
                            name="newPost"
                            component={TextArea}
                            placeholder="add a new post..."
                            type="text"
                            validate={composeValidators(required, maxValue(5))}
                        ></Field>
                    </div>
                    <div>
                        <button>Add post</button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
        />
    );
};
export default AddPostForm;
