import { FC, useEffect, useState } from "react";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import { ChatAddMessageForm } from "./ChatAddMessageForm/ChatAddMessageForm";

const Chat: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            // for reconnect we should recall function createChannel()
            setTimeout(createChannel, 3000);
        };

        function createChannel() {
            // if ws !== null
            ws?.removeEventListener("close", closeHandler);
            ws?.close();

            ws = new WebSocket(
                "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
            );
            ws.addEventListener("close", closeHandler);
            setWsChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener("close", closeHandler);
            if(ws.readyState === 1) {
                ws.close();
            }

        };
    }, []);

    return (
        <div>
            <ChatMessages wsChannel={wsChannel} />
            <ChatAddMessageForm wsChannel={wsChannel} />
        </div>
    );
};

export default Chat;
