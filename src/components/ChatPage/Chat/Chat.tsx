import { FC, useEffect } from "react";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import { ChatAddMessageForm } from "./ChatAddMessageForm/ChatAddMessageForm";
import { wsChannel } from "../ChatPage";

const Chat: FC = () => {

    return (
        <div>
            <ChatMessages />
            <ChatAddMessageForm />
        </div>
    );
};

export default Chat;
