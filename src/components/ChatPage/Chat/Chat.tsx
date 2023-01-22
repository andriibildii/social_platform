import { FC, useEffect } from "react";
import { Messages } from "./ChatMessages/Messages";
import { AddMessageForm } from "./ChatAddMessageForm/AddMessageForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { startMessagesListening, stopMessagesListener } from "../../../redux/chat-reducer";

const Chat: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListener())
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
};

export default Chat;
