import { useDispatch } from "react-redux";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { Button, Stack } from "@mui/material";
import { actions } from "../../../../redux/profile-reducer";
import { AppDispatch } from "../../../../redux/store";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";

type ValuesType = {
    newPost: string;
};

const DisplayingErrorPostsSchema = Yup.object().shape({
    newPost: Yup.string().min(2, "Too Short!").max(10, "Too Long!"),
});

export const AddPostForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const addPost = (newPostBody: string) => {
        dispatch(actions.addPostActionCreator(newPostBody));
    };

    return (
        <div>
            <Formik
                initialValues={{
                    newPost: "",
                }}
                validationSchema={DisplayingErrorPostsSchema}
                onSubmit={(
                    values: ValuesType,
                    { setSubmitting }: FormikHelpers<ValuesType>
                ) => {
                    addPost(values.newPost);
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
                          id="newPost"
                          name="newPost"
                          label="add new post..."
                          type="text"
                          component={TextField}
                          multiline
                          rows={2}
                          fullWidth
                        />
                        <Button type="submit" color="primary" variant="contained">
                            Send - <SendIcon />
                        </Button>
                    </Stack>
                    <Stack>

                    </Stack>
                </Form>
            </Formik>
        </div>
    );
};
