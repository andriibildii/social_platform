import { FC, useEffect } from "react";
import Chat from "./Chat/Chat";

export const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string
}

const ChatPage: FC = () => {
    return <Chat />;
};

export default ChatPage;
