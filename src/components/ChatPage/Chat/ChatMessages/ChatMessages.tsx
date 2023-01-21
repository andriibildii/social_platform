import { FC, useEffect, useState } from "react";
import { Message } from "./Message/Message";
import { ChatMessageType, wsChannel } from "../../ChatPage";

export const ChatMessages: FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    useEffect(() => {
        wsChannel.onmessage = (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data);
            setMessages((prevMessage) =>[ ...prevMessage, ...newMessage]);
        };
    }, []);

    return (
        <div style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((message, index) => (
                <Message key={index} message={message}/>
            ))}
        </div>
    );
};
