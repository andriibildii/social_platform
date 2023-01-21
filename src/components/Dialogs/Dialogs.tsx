import { FC } from "react";
// import { useNavigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import Card from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import style from "./Dialogs.module.css";
import { InitialStateType } from "../../redux/dialogs-reducer";

export type MapStateToPropsType = {
    dialogsPage: InitialStateType;
};
export type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void;
};
export type OwmPropsType = {
    isAuth: boolean;
};

export type FormDataType = {
    newMessage: string;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwmPropsType;

const Dialogs: FC<PropsType> = ({ dialogsPage, sendMessage, isAuth }) => {
    // const navigate = useNavigate();
    const dialogs = dialogsPage.dialogs;
    const messages = dialogsPage.messages;

    // useEffect(() => {
    //     !isAuth && navigate("/login");
    // }, [isAuth]);

    const addNewMessage = (formData: FormDataType) => {
        console.log("new mess", formData.newMessage);
        sendMessage(formData.newMessage);
    };

    return (
        <Box>
            <Grid
                container
                direction="row"
                columnSpacing={1}
                rowSpacing={1}
            >
                <Grid item xs={12} md={4}>
                    <Card>
                        <div className={style.dialogs}>
                            <div className={style.dialogsItems}>
                                {dialogs.map((dialog) => (
                                    <DialogItem
                                        name={dialog.name}
                                        id={dialog.id}
                                        key={dialog.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <div className={style.messages}>
                            <div>
                                {messages.map((messageItem) => (
                                    <Messages
                                        message={messageItem.message}
                                        key={messageItem.id}
                                    />
                                ))}
                            </div>
                            <AddMessageForm onSubmit={addNewMessage} />
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dialogs;
