import { FC } from "react";
import { Form, Field } from "react-final-form";
import { maxValue } from "../../../../utils/validators";
import { TextArea } from "../../../../common/FormsControls/FormsControls";
import { FormDataType } from "../MyPosts";

type PropsTypes = {
  onSubmit: (formData: FormDataType) => void
}

const AddPostForm: FC<PropsTypes> = ({ onSubmit }) => {
    // const composeValidators =
    //     (...validators) =>
    //     (value: number) =>
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
                            name="newPost"
                            component={TextArea}
                            placeholder="add a new post..."
                            type="text"
                            validate={maxValue(50)}
                        ></Field>
                    </div>
                    <div>
                        <button>Add post</button>
                    </div>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                </form>
            )}
        />
    );
};
export default AddPostForm;
