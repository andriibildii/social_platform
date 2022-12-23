import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import style from "./Dialogs.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dialogs = ({
    dialogsPage,
    sendMessage,
    updateNewMessageBody,
    isAuth,
}) => {
    // const navigate = useNavigate();
    const dialogs = dialogsPage.dialogs;
    const messages = dialogsPage.messages;
    const inputText = dialogsPage.newMessageBody;

    const sendMessageClick = () => {
        sendMessage();
    };

    const inputChange = (e) => {
        updateNewMessageBody(e.target.value);
    };

    // useEffect(() => {
    //     !isAuth && navigate("/login");
    // }, [isAuth]);

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
                <div>
                    <textarea
                        onChange={inputChange}
                        value={inputText}
                        placeholder="add new message..."
                    />
                </div>
                <div>
                    <button onClick={sendMessageClick}>Send Message</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
