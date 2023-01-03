import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import style from "./Dialogs.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

const Dialogs = ({ dialogsPage, sendMessage, isAuth }) => {
    // const navigate = useNavigate();
    const dialogs = dialogsPage.dialogs;
    const messages = dialogsPage.messages;

    // useEffect(() => {
    //     !isAuth && navigate("/login");
    // }, [isAuth]);

    const addNewMessage = (formData) => {
        console.log("new mess", formData.newMessage);
        sendMessage(formData.newMessage);
    };

    return (
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
        </div>
    );
};

export default Dialogs;
