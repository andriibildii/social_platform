/*
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
*/

import { useDispatch } from "react-redux";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField } from "formik-mui";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { AppDispatch } from "../../../store/store";
import { actions } from "../../../store/dialogs-reducer";

type ValuesType = {
    newMessage: string;
};

const DisplayingErrorPostsSchema = Yup.object().shape({
    newMessage: Yup.string().max(20, "Too Long!"),
});

export const AddMessageForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const addNewMessage = (newMessageBody: string) => {
        dispatch(actions.sendMessageCreator(newMessageBody));
    };

    return (
        <div>
            <Formik
                initialValues={{
                    newMessage: "",
                }}
                validationSchema={DisplayingErrorPostsSchema}
                onSubmit={(
                    values: ValuesType,
                    { setSubmitting }: FormikHelpers<ValuesType>
                ) => {
                    addNewMessage(values.newMessage)
                    setSubmitting(false);
                }}
            >
                <Form>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0.5}
                    >
                        <Field
                            id="newMessage"
                            name="newMessage"
                            label="add new message..."
                            type="text"
                            component={TextField}
                            multiline
                            rows={2}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Send - <SendIcon />
                        </Button>
                    </Stack>
                    <Stack></Stack>
                </Form>
            </Formik>
        </div>
    );
};
