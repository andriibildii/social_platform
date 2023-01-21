import { FC, useEffect, useState } from "react";
import { Message } from "./Message/Message";
import { ChatMessageType } from "../../ChatPage";

export const ChatMessages: FC<{ wsChannel: WebSocket | null }> = ({
    wsChannel,
}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data);
            setMessages((prevMessage) => [...prevMessage, ...newMessage]);
        };

        wsChannel?.addEventListener("message", messageHandler);

        return () => {
            wsChannel?.removeEventListener("message", messageHandler);
        };
    }, [wsChannel]);

    return (
        <div style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </div>
    );
};
