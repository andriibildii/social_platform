import { FC, useEffect } from "react";
import { Messages } from "./ChatMessages/Messages";
import { AddMessageForm } from "./ChatAddMessageForm/AddMessageForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../../redux/store";
import {
    startMessagesListening,
    stopMessagesListener,
} from "../../../redux/chat-reducer";

const Chat: FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListener());
        };
    }, []);

    return (
        <div>
            {status === "error" && <div>Error, please refresh the page</div>}
            <Messages />
            <AddMessageForm />
        </div>
    );
};

export default Chat;
