import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../../../store/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../../../store/users-selectors";
import Button from "@mui/material/Button";
import { TextField, Select } from "formik-mui";
import { MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
};

type FriendFormType = "true" | "false" | "null";

type FormType = {
    term: string;
    friend: FriendFormType;
};

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter);
    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            term: values.term,
            friend:
                values.friend === "null"
                    ? null
                    : values.friend === "true"
                    ? true
                    : false,
        };
        props.onFilterChanged(filter);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend) as FriendFormType,
                }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0.5}
                            margin={2}
                        >
                            <Field
                                type="text"
                                name="term"
                                label="term"
                                component={TextField}
                                size="small"
                                // variant="standard"

                                // helperText="Set params for find users"
                                id="term"
                            />
                            <Field
                                name="friend"
                                as="select"
                                component={Select}
                                size="small"

                                // variant="standard"
                            >
                                <MenuItem value="null">All</MenuItem>
                                <MenuItem value="true">Only followed</MenuItem>
                                <MenuItem value="false">
                                    Only unfollowed
                                </MenuItem>

                                {/*<option value="null">All</option>*/}
                                {/*<option value="true">Only followed</option>*/}
                                {/*<option value="false">Only unfollowed</option>*/}
                            </Field>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Find
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </div>
    );
});

// import React, { FC } from "react";
// import { Field, Form, Formik } from "formik";
// import { FilterType } from "../../../../store/users-reducer";

// const usersSearchFormValidate = (values: any) => {
//   const errors = {}
//   return errors
// }
//
// type FriendFormType = 'true' | 'false' | 'null'
//
// type FormType = {
//   term: string
//   friend: 'true' | 'false' | 'null'
// }
//
// type PropsType = {
//   onFilterChanged: (filter: FilterType) => void
// }
//
//
// export const UsersSearchForm: FC<PropsType> = React.memo(
//     ({ onFilterChanged }) => {
//         const submit = (
//             values: FormType,
//             {
//                 setSubmitting,
//             }: { setSubmitting: (isSubmitting: boolean) => void }
//         ) => {
//
//           const filter: FilterType = {
//             term: values.term,
//             friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
//           }
//             onFilterChanged(filter);
//             setSubmitting(false);
//         };
//
//         return (
//             <div>
//                 <Formik
//                   enableReinitialize
//                     initialValues={{ term: "", friend: "null" }}
//                     validate={usersSearchFormValidate}
//                     onSubmit={submit}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form>
//                             <Field type="text" name="term" />
//                             <Field name="friend" as="select">
//                                 <option value="null">All</option>
//                                 <option value="true">Only Following</option>
//                                 <option value="false">Only Unfollowing</option>
//                             </Field>
//                             <button type="submit" disabled={isSubmitting}>
//                                 Search
//                             </button>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         );
//     }
// );
