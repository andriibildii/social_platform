import { FC } from "react";
// import { useNavigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import style from "./Dialogs.module.css";
import { InitialStateType } from "../../redux/dialogs-reducer";

export type MapStateToPropsType = {
    dialogsPage: InitialStateType
}
export type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type OwmPropsType = {
    isAuth: boolean
}

export type FormDataType = {
    newMessage: string
}

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
        <Card sx={{ minHeight: 796 }}>
            <div className={style.dialogs}>
                <Stack
                    direction="row"
                    alignItems="stretch"
                    justifyContent="flex-start"
                    spacing={1}
                >
                    <div className={style.dialogsItems}>
                        {dialogs.map((dialog) => (
                            <DialogItem
                                name={dialog.name}
                                id={dialog.id}
                                key={dialog.id}
                            />
                        ))}
                    </div>
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
                </Stack>
            </div>
        </Card>
    );
};

export default Dialogs;
